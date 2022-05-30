import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      email: 'admin@verifinow.com',
      password: 'Abc@1234',
      name: 'Super Admin',
      userType: 1,
      isActive: true,
      designation: 'admin',
      department: 'admin',
    })
  }
}
