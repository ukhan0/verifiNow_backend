import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Model from 'App/Models/Company'

export default class CompaniesController {
  public async index({ response }: HttpContextContract) {
    try {
      const rows = await Model.query()

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

  public async create({ request, response }: HttpContextContract) {
    try {
      const requestSchema = schema.create({
        name: schema.string(),
        size: schema.string.optional(),
        website: schema.string.optional(),
        is_active: schema.boolean.optional(),
        verify_facial: schema.boolean.optional(),
        verify_audio: schema.boolean.optional(),
        verify_device: schema.boolean.optional(),
        verification_interval_in_mins: schema.number.optional(),
      })

      let data = await request.validate({ schema: requestSchema })

      const instance = await Model.create(data)

      return response.json({
        status: true,
        message: 'Company has been created.',
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
      const instance = await Model.query().where('id', params.id).first()

      if (!instance) {
        return response.json({
          status: false,
          message: `Company with id ${params.id} not found.`,
        })
      }

      return response.json({
        status: true,
        message: 'Company Details.',
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

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const requestSchema = schema.create({
        name: schema.string.optional(),
        size: schema.string.optional(),
        website: schema.string.optional(),
        is_active: schema.boolean.optional(),
        verify_facial: schema.boolean.optional(),
        verify_audio: schema.boolean.optional(),
        verify_device: schema.boolean.optional(),
        verification_interval_in_mins: schema.number.optional(),
      })

      const data = await request.validate({ schema: requestSchema })

      const instance = await Model.query().where('id', params.id).first()

      if (!instance) {
        return response.json({
          status: false,
          message: `Company with id ${params.id} not found.`,
        })
      }

      await Model.query().where('id', params.id).update(data)

      return response.json({
        status: true,
        message: 'Company has been updated.',
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
      const instance = await Model.query().where('id', params.id).first()

      if (!instance) {
        return response.json({
          status: false,
          message: `Company with id ${params.id} not found.`,
        })
      }

      await instance.delete()

      return response.json({
        status: true,
        message: 'Company has been deleted.',
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
