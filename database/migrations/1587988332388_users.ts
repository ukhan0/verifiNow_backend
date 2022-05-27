import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('designation', 180).notNullable()
      table.string('department', 180).notNullable()

      table.string('remember_me_token').nullable()

      table.string('name')
      table.string('first_name')
      table.string('last_name')

      table.string('email', 255).notNullable().unique()
      table.boolean('email_verified').notNullable().defaultTo(false)

      table.boolean('is_active').defaultTo(false)
      table.integer('company_id').unsigned().index().nullable().references('id').inTable('companies').onUpdate('cascade').onDelete('SET NULL')
      table.integer('user_type').notNullable().defaultTo(3).comment('1=super-admin,2=admin,3=employee')

      table.date('dob')
      table.text('about_me')
      table.string('address', 255)

      table.string('phone')
      table.string('phone_cc')
      table.string('phone_no')
      table.boolean('phone_verified').notNullable().defaultTo(false)

      table.string('pic_url', 255)
      table.string('password', 255).nullable()

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
