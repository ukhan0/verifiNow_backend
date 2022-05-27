import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public originalName: string

  @column()
  public originalExt: string

  @column()
  public randomName?: string

  @column()
  public originalLocalPath?: string

  @column()
  public pathFull?: string

  @column()
  public mediaType?: string

  @column()
  public isActive: boolean

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
