import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Companies extends BaseSchema {
  protected tableName = 'companies'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('company_name').notNullable()
      table.string('company_size')
      table.string('company_website')
      table.boolean('is_active').defaultTo(false)
      table.boolean('verify_facial').defaultTo(false)
      table.boolean('verify_audio').defaultTo(false)
      table.boolean('verify_device').defaultTo(false)
      table.string('verification_interval').comment('random or fixed')
      table.integer('interval_in_mins')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
