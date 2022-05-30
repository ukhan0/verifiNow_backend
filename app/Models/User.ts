import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Device from 'App/Models/Device'
import Company from 'App/Models/Company'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName?: string

  @column()
  public lastName?: string

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public phone: string

  @column()
  public designation: string

  @column()
  public department: string

  @column()
  public userType: number

  @column()
  public isActive: boolean

  @column()
  public address?: string

  @column()
  public companyId?: number

  @column()
  public empVideoSamplePath?: string

  @column()
  public rememberMeToken?: string

  @column()
  public accessToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Device)
  public devices: HasMany<typeof Device>

  @belongsTo(() => Company)
  public company: BelongsTo<typeof Company>
}
