import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Companies extends BaseSchema {
  protected tableName = 'companies'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.string('size')
      table.string('website')
      table.boolean('is_active').defaultTo(false)
      table.boolean('verify_facial').defaultTo(false)
      table.boolean('verify_audio').defaultTo(false)
      table.boolean('verify_device').defaultTo(false)
      table.integer('verification_interval_in_mins')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
