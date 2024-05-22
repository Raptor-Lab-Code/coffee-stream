import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import ffmpeg from 'fluent-ffmpeg'
import Playlist from '#models/playlist'
import Guest from '#models/guest'

export default class Video extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare path: string

  @column()
  declare duration: number

  @column()
  declare status: 'published' | 'unpublished' | 'pending'

  @column()
  declare showInLive: boolean

  @column()
  declare userId: number | null

  @column()
  declare guestId: number | null

  @manyToMany(() => Playlist, {
    pivotTable: 'playlist_videos',
  })
  declare playlists: ManyToMany<typeof Playlist>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Guest)
  declare guest: BelongsTo<typeof Guest>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static async getInformation(path: string): Promise<ffmpeg.FfprobeData> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(path, (err: any, metadata: unknown) => {
        if (err) {
          reject(err)
        } else {
          resolve(metadata as ffmpeg.FfprobeData)
        }
      })
    })
  }

  static async getDuration(path: string): Promise<number | undefined> {
    const metadata = await Video.getInformation(path)
    return metadata.format.duration
  }

  async elapsedTime(): Promise<number> {
    const now = DateTime.now()
    const diff = now.diff(this.duration, 'milliseconds')
    return diff.milliseconds
  }
  async getDurationInSeconde() {
    if (this.duration >= 0) {
      return this.duration
    } else return 0
  }

  async getDurationInMilisecond(): Promise<number> {
    return this.duration * 1000
  }

  getDurationInFormat(): string {
    const duration = this.duration
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    const seconds = Math.floor(duration % 60)
    return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds > 0 ? seconds + 's' : ''}`
  }

  async requiresEncoding(): Promise<boolean> {
    const metadata = await Video.getInformation(this.path)

    return !(
      metadata.streams[0].codec_name === 'h264' &&
      metadata.streams[0].width === 1920 &&
      metadata.streams[0].height === 1080 &&
      metadata.streams[0].r_frame_rate === '60/1' &&
      metadata.streams[1].codec_name === 'aac' &&
      metadata.streams[1].sample_rate === 48000
    )
  }
}
