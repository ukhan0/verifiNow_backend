import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import * as fs from 'fs'
import Drive from '@ioc:Adonis/Core/Drive'
import { v4 as uuid } from 'uuid'
import Media from 'App/Models/Media'

export default class MediaController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      const rows = await Media.query().where('user_id', auth.user!.id)

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

  public async create({ auth, request, response }: HttpContextContract) {
    try {
      const file = request.file('file')
      const validTypes = ['mp4']

      if (!file) {
        return response.json({
          status: false,
          message: `File must be attached with request`,
        })
      }

      if (!validTypes.includes(file.extname!)) {
        return response.json({
          status: false,
          message: `File type must be one of ${validTypes}`,
        })
      }

      const contents = fs.readFileSync(file.tmpPath!)

      let fileRandomName = uuid()
      let fileLocalPath = `user_${auth.user!.id}/${fileRandomName}.${file.extname}`

      await Drive.put(fileLocalPath, contents, {
        ContentType: `video/${file.extname}`,
      })

      let fileFullPath = await Drive.getUrl(fileLocalPath)

      let media = new Media()
      media.originalName = file.clientName
      media.originalExt = file.extname!
      media.randomName = fileRandomName
      media.originalLocalPath = fileLocalPath
      media.pathFull = fileFullPath!
      media.userId = auth.user!.id
      await media.save()

      return response.json({
        status: true,
        message: 'File has been uploaded.',
        data: media,
      })
    } catch (error) {
      console.log(error)
      return response.json({
        status: false,
        message: error,
      })
    }
  }

  public async details({ auth, params, response }: HttpContextContract) {
    try {
      const instance = await Media.query().where('id', params.id).where('user_id', auth.user!.id).first()

      if (!instance) {
        return response.json({
          status: false,
          message: `File with id ${params.id} not found.`,
        })
      }

      return response.json({
        status: true,
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

  public async update({ request, params, response, auth }: HttpContextContract) {
    try {
      const instance = await Media.query().where('id', params.id).where('user_id', auth.user!.id).first()

      if (!instance) {
        return response.json({
          status: false,
          message: `File with id ${params.id} not found.`,
        })
      }

      const file = request.file('file')
      const validTypes = ['mp4']

      if (!file) {
        return response.json({
          status: false,
          message: `File must be attached with request`,
        })
      }

      if (!validTypes.includes(file.extname!)) {
        return response.json({
          status: false,
          message: `File type must be one of ${validTypes}`,
        })
      }

      const contents = fs.readFileSync(file.tmpPath!)

      let fileLocalPath = instance.originalLocalPath!

      await Drive.put(fileLocalPath, contents, {
        ContentType: `video/${file.extname}`,
      })

      let fileFullPath = await Drive.getUrl(fileLocalPath)

      instance.originalName = file.clientName
      instance.originalExt = file.extname!
      instance.pathFull = fileFullPath!
      instance.userId = auth.user!.id
      await instance.save()

      return response.json({
        status: true,
        message: 'File has been updated.',
        data: instance,
      })
    } catch (error) {
      console.log(error)
      return response.json({
        status: false,
        message: error,
      })
    }
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    try {
      const instance = await Media.query().where('id', params.id).where('user_id', auth.user!.id).first()

      if (!instance) {
        return response.json({
          status: false,
          message: `File with id ${params.id} not found.`,
        })
      }

      await Drive.delete(instance.originalLocalPath!)

      await instance.delete()

      return response.json({
        status: true,
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
}
