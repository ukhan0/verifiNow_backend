import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Devices extends BaseSchema {
  protected tableName = 'devices'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('serial_number').notNullable()
      table.string('device_type').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
