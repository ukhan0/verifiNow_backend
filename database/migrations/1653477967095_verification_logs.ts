import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VerificationLogs extends BaseSchema {
  protected tableName = 'verification_logs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('device_id').unsigned().references('id').inTable('devices').onDelete('CASCADE')
      table.boolean('status').defaultTo(false)
      table.integer('media_id').unsigned().references('id').inTable('media').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
