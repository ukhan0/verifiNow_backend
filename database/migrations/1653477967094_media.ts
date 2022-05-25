import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Media extends BaseSchema {
  protected tableName = 'media'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('original_name', 100).notNullable()
      table.string('original_ext', 10).notNullable()
      table.string('random_name', 100)
      table.string('original_local_path')
      table.text('path_full')
      table.string('media_type')
      table.boolean('is_active').defaultTo(true)
      table.integer('user_id').unsigned().notNullable().index().references('id').inTable('users').onUpdate('cascade').onDelete('cascade')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
