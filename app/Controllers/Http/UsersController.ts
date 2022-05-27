import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async createEmployee({ request, response }: HttpContextContract) {
    try {
      const employeeSchema = schema.create({
        email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email', caseInsensitive: true })]),
        password: schema.string([rules.minLength(8)]),
        name: schema.string(),
        first_name: schema.string.optional(),
        last_name: schema.string.optional(),
        designation: schema.string(),
        department: schema.string(),
        address: schema.string.optional(),
      })

      const employeeData = await request.validate({ schema: employeeSchema })

      const user = await User.create(employeeData)

      return response.json({
        status: true,
        message: 'Employee has been created.',
        data: user.toJSON(),
      })
    } catch (error) {
      console.error(error)
      return response.json({
        status: false,
        message: error,
      })
    }
  }
}
