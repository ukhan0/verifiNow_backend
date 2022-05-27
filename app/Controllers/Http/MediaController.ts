import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import * as fs from 'fs'
import Drive from '@ioc:Adonis/Core/Drive'
import { v4 as uuid } from 'uuid'
import Media from 'App/Models/Media'

export default class MediaController {
  public async index({}: HttpContextContract) {}

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
      let fileLocalPath = `onboarding/user_${auth.user!.id}/${fileRandomName}.${file.extname}`

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

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
