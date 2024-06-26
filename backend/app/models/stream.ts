import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  column,
  manyToMany,
  afterCreate,
  beforeDelete,
} from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import logger from '@adonisjs/core/services/logger'
import Provider from '#models/provider'
import StreamFactory from '#models/streamsFactory/stream_factory'
import { StreamProvider } from '#models/streamsFactory/ffmpeg'
import Timeline from '#models/timeline'
import Video from '#models/video'
import transmit from '@adonisjs/transmit/services/main'
import * as fs from 'node:fs'
import { cuid } from '@adonisjs/core/helpers'
import path from 'node:path'
import app from '@adonisjs/core/services/app'

export default class Stream extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare pid: number

  @column()
  declare status: 'active' | 'inactive'

  @column()
  declare restartTimes: number

  @column()
  declare currentIndex: number

  @column()
  declare type: string

  @column()
  declare userId: number

  @column()
  declare providerId: number

  @column()
  declare timelineId: number

  @column()
  declare overlay: string | null | undefined

  @column()
  declare guestFile: string

  @column()
  declare cryptoFile: string

  @column()
  declare logo: string | null | undefined

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime()
  declare startTime: DateTime | null

  @column.dateTime()
  declare endTime: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Provider, {
    pivotTable: 'stream_providers',
    pivotColumns: ['on_primary'],
  })
  declare providers: ManyToMany<typeof Provider>

  @belongsTo(() => Timeline)
  declare timeline: BelongsTo<typeof Timeline>
  declare streamProvider: StreamProvider | null
  canNextVideo: boolean = false
  declare providersInstance: Provider[]
  declare primaryProvider: Provider | null
  declare streamStartTime: DateTime
  declare nextVideoTimeout: NodeJS.Timeout | null

  @afterCreate()
  static async createBaseFiles(stream: Stream) {
    const dir = `${app.makePath('resources/datas/streams')}`

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    stream.guestFile = path.join(dir, `${cuid()}_guest.txt`)
    stream.cryptoFile = path.join(dir, `${cuid()}_crypto.txt`)

    fs.writeFileSync(stream.guestFile, 'Upload by : CoffeeStream')
    fs.writeFileSync(stream.cryptoFile, 'Market : 0.00 XNeuros / $')

    await stream.save()
  }

  @beforeDelete()
  static async deleteBaseFiles(stream: Stream) {
    stream.removeAssets()
  }

  async updateGuestText() {
    const currentVideo = await this.timeline.getCurrentVideo(this.currentIndex)
    await currentVideo.load('guest')
    await currentVideo.load('user')

    const guestText = !currentVideo.showInLive
      ? ''
      : currentVideo.guest
        ? `Upload by : ${currentVideo.guest.displayName}`
        : currentVideo.user
          ? `Upload by : ${currentVideo.user.fullName}`
          : 'Guest is not loaded for the current video'

    fs.writeFileSync(this.guestFile, guestText)
  }

  async updateCryptoText(value: number = 0) {
    if (value <= 0) {
      value = await fetch('https://www.coingecko.com/price_charts/30105/usd/24_hours.json', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          return data.stats[data.stats.length - 1][1] || 0
        })
    }
    fs.writeFileSync(this.cryptoFile, `Market : ${value} XNeuros / $`)
  }

  async nextVideo() {
    if (this.status === 'inactive' || !this.canNextVideo) {
      logger.info('Stream is not live or not ready to switch videos.')
      return
    }

    const currentVideo: Video = await this.timeline.getCurrentVideo(this.currentIndex)
    const durationMs: number = await currentVideo.getDurationInMilisecond()
    logger.info(
      `Waiting for ${await currentVideo.getDurationInSeconde()}s until the video ${currentVideo.title} ends`
    )

    const totalStreamTime = DateTime.now().diff(this.streamStartTime).as('milliseconds')
    logger.info(`Temps total de stream : (${totalStreamTime} millisecondes)`)

    if (totalStreamTime + durationMs > this.restartTimes) {
      logger.info('28h de stream atteint, arrêt du stream après la vidéo en cours')
      this.canNextVideo = false
      this.nextVideoTimeout = setTimeout(async () => {
        await this.restartStream()
      }, durationMs)
    } else {
      this.nextVideoTimeout = setTimeout(async () => {
        if (this.status === 'inactive') {
          logger.info('Stream has been stopped. Not proceeding to the next video.')
          return
        }

        await this.moveToNextVideo()

        if (!(await this.timeline.getCurrentVideo(this.currentIndex))) {
          logger.info('Fin de la playlist.')
          await this.restartStream()
          return
        }

        transmit.broadcast(`streams/${this.id}/currentVideo`, {
          currentVideo: await this.timeline.getCurrentVideo(this.currentIndex),
        })
        await this.updateGuestText()

        await this.save()
        await this.nextVideo()
      }, durationMs)
    }
  }

  async moveToNextVideo() {
    if (this.currentIndex + 1 <= (await this.timeline.videos()).length) {
      this.currentIndex++
    } else {
      this.currentIndex = 0
    }
  }

  async run() {
    logger.info(`Starting stream ${this.id}`)

    const providers = await this.related('providers').query().pivotColumns(['on_primary'])
    this.providersInstance = await Promise.all(
      providers.map((provider) => Provider.createProvider(provider))
    )
    const primary = this.providersInstance.find(
      (provider) => provider.$extras.pivot_on_primary === 1
    )
    this.primaryProvider = primary ?? null
    this.currentIndex = 0

    if (this.primaryProvider) {
      this.streamProvider = StreamFactory.createProvider(
        'ffmpeg',
        this.primaryProvider.baseUrl,
        this.primaryProvider.streamKey,
        this.timeline.filePath,
        this.logo || '',
        this.overlay || '',
        this.guestFile,
        this.cryptoFile
      )

      transmit.broadcast(`streams/${this.id}/currentVideo`, {
        currentVideo: await this.timeline.getCurrentVideo(this.currentIndex),
      })
      await this.updateCryptoText()
      await this.updateGuestText()
      await this.start()

      this.streamStartTime = DateTime.now()
      this.canNextVideo = true

      await this.nextVideo()
    } else {
      logger.warn('No primary provider found')
    }
    await this.save()
  }

  async start(): Promise<void> {
    this.pid = this.streamProvider ? this.streamProvider.startStream() : process.pid
    this.startTime = DateTime.now()
    this.status = 'active'

    await this.save()
  }

  async stop(): Promise<void> {
    logger.info(`Stopping streams ${this.id}`)
    clearTimeout(this.nextVideoTimeout as NodeJS.Timeout)

    if (this.streamProvider) {
      this.streamProvider.stopStream(this.pid)
    } else {
      if (this.pid > 0) {
        process.kill(this.pid, 'SIGKILL')
      }
    }
    this.endTime = DateTime.now()
    this.status = 'inactive'
    this.pid = 0

    await this.save()
  }

  async restartStream() {
    logger.info('Redémarrage du stream')
    await this.stop()

    const remainingTime = await this.timeline.getTimeRestOfVideos(this.currentIndex)
    logger.warn(`Temps restant : ${remainingTime}`)
    if (remainingTime > this.restartTimes) {
      await this.timeline.generatePlaylistFile('m3u8', this.currentIndex)
    } else {
      await this.timeline.generatePlaylistFileWithRepetition('m3u8', this.currentIndex)
    }
    setTimeout(async () => {
      await this.run()
    }, 10000)
  }

  async getPrimaryProvider() {
    const providers = await this.related('providers').query().pivotColumns(['on_primary'])
    const primary = providers.find((provider) => provider.$extras.pivot_on_primary === 1)
    return primary ?? null
  }

  removeAssets() {
    if (this.logo) {
      fs.unlink(this.logo, (err) => {
        if (err) {
          logger.error(err)
        }
      })
    }

    if (this.overlay) {
      fs.unlink(this.overlay, (err) => {
        if (err) {
          logger.error(err)
        }
      })
    }

    if (this.guestFile) {
      fs.unlink(this.guestFile, (err) => {
        if (err) {
          logger.error(err)
        }
      })
    }

    if (this.cryptoFile) {
      fs.unlink(this.cryptoFile, (err) => {
        if (err) {
          logger.error(err)
        }
      })
    }
  }
}
