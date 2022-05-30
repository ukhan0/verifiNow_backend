import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
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

  public async index({ response }: HttpContextContract) {
    try {
      const user = await User.query().where('user_type', 3)

      return response.json({
        status: true,
        message: 'Employee List.',
        data: user,
      })
    } catch (error) {
      console.error(error)
      return response.json({
        status: false,
        message: error,
      })
    }
  }

  public async details({ params, response }: HttpContextContract) {
    try {
      const user = await User.query().where('id', params.id).where('user_type', 3).preload('devices').preload('company').first()

      if (!user) {
        return response.json({
          status: false,
          message: `Employee with id ${params.id} not found.`,
        })
      }

      return response.json({
        status: true,
        message: 'Employee Details.',
        data: user,
      })
    } catch (error) {
      console.error(error)
      return response.json({
        status: false,
        message: error,
      })
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const employeeSchema = schema.create({
        email: schema.string.optional([rules.email()]),
        name: schema.string.optional(),
        first_name: schema.string.optional(),
        last_name: schema.string.optional(),
        designation: schema.string.optional(),
        department: schema.string.optional(),
        address: schema.string.optional(),
      })

      const employeeData = await request.validate({ schema: employeeSchema })

      const user = await User.query().where('id', params.id).where('user_type', 3).first()

      if (!user) {
        return response.json({
          status: false,
          message: `Employee with id ${params.id} not found.`,
        })
      }

      await User.query().where('id', params.id).update(employeeData)

      return response.json({
        status: true,
        message: 'Employee has been updated.',
      })
    } catch (error) {
      console.error(error)
      return response.json({
        status: false,
        message: error,
      })
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const user = await User.query().where('id', params.id).where('user_type', 3).first()

      if (!user) {
        return response.json({
          status: false,
          message: `Employee with id ${params.id} not found.`,
        })
      }

      await user.delete()

      return response.json({
        status: true,
        message: 'Employee has been deleted.',
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
