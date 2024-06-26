import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Video from '#models/video'

export default class Playlist extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare isPublished: boolean

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Video, {
    pivotTable: 'playlist_videos',
    pivotColumns: ['order'],
  })
  declare videos: ManyToMany<typeof Video>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  async getTotalDuration(): Promise<number> {
    const videos = await this.related('videos').query()
    let totalDuration = 0
    for (const video of videos) {
      totalDuration += video.duration
    }
    return totalDuration
  }

  async getVideoCount(): Promise<number> {
    const videos = await this.related('videos').query()
    return videos.length
  }
}
