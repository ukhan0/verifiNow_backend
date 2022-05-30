import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Model from 'App/Models/Device'

export default class DevicesController {
  public async index({ params, response }: HttpContextContract) {
    try {
      const user = await User.query().where('id', params.empId).where('user_type', 3).first()

      if (!user) {
        return response.json({
          status: false,
          message: `Employee with id ${params.empId} not found.`,
        })
      }

      const rows = await Model.query().where('user_id', params.empId)

      return response.json({
        status: true,
        data: rows,
      })
    } catch (error) {
      console.error(error)
      return response.json({
        status: false,
        message: error,
      })
    }
  }

  public async create({ request, params, response }: HttpContextContract) {
    try {
      const requestSchema = schema.create({
        name: schema.string(),
        serial_number: schema.string(),
        device_type: schema.enum(['HEAD_SET', 'LAPTOP']),
        user_id: schema.number.optional(),
      })

      const user = await User.query().where('id', params.empId).where('user_type', 3).first()

      if (!user) {
        return response.json({
          status: false,
          message: `Employee with id ${params.empId} not found.`,
        })
      }

      let data = await request.validate({ schema: requestSchema })
      data.user_id = params.empId

      const instance = await Model.create(data)

      return response.json({
        status: true,
        message: 'Device has been created.',
        data: instance.toJSON(),
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
      const user = await User.query().where('id', params.empId).where('user_type', 3).first()

      if (!user) {
        return response.json({
          status: false,
          message: `Employee with id ${params.empId} not found.`,
        })
      }

      const instance = await Model.query().where('id', params.id).where('user_id', params.empId).first()

      if (!instance) {
        return response.json({
          status: false,
          message: `Device with id ${params.id} not found.`,
        })
      }

      return response.json({
        status: true,
        message: 'Device Details.',
        data: instance,
      })
    } catch (error) {
      console.error(error)
      return response.json({
        status: false,
        message: error,
      })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const requestSchema = schema.create({
        name: schema.string.optional(),
        serial_number: schema.string.optional(),
        device_type: schema.enum.optional(['HEAD_SET', 'LAPTOP']),
      })

      const data = await request.validate({ schema: requestSchema })

      const user = await User.query().where('id', params.empId).where('user_type', 3).first()

      if (!user) {
        return response.json({
          status: false,
          message: `Employee with id ${params.empId} not found.`,
        })
      }

      const instance = await Model.query().where('id', params.id).where('user_id', params.empId).first()

      if (!instance) {
        return response.json({
          status: false,
          message: `Device with id ${params.id} not found.`,
        })
      }

      await Model.query().where('id', params.id).update(data)

      return response.json({
        status: true,
        message: 'Device has been updated.',
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
      const user = await User.query().where('id', params.empId).where('user_type', 3).first()

      if (!user) {
        return response.json({
          status: false,
          message: `Employee with id ${params.empId} not found.`,
        })
      }

      const instance = await Model.query().where('id', params.id).where('user_id', params.empId).first()

      if (!instance) {
        return response.json({
          status: false,
          message: `Device with id ${params.id} not found.`,
        })
      }

      await instance.delete()

      return response.json({
        status: true,
        message: 'Device has been deleted.',
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
