import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public size?: string

  @column()
  public website?: string

  @column()
  public isActive: boolean

  @column()
  public verifyFacial: boolean

  @column()
  public verifyAudio: boolean

  @column()
  public verifyDevice: boolean

  @column()
  public verificationIntervalInMins?: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
