import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import * as fs from 'fs'
import User from 'App/Models/User'
import Drive from '@ioc:Adonis/Core/Drive'
import { v4 as uuid } from 'uuid'

export default class UsersController {
  public async uploadSampleVideo({ request, params, response }: HttpContextContract) {
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

      let user = await User.query().where('id', params.user).first()

      if (!user) {
        return response.json({
          status: false,
          message: `User with id ${params.user} not found.`,
        })
      }

      const contents = fs.readFileSync(file.tmpPath!)

      let file_uuid = uuid()
      let file_path = `samples/user_${params.user}/${file_uuid}.${file.extname}`

      await Drive.put(file_path, contents, {
        ContentType: `video/${file.extname}`,
      })

      user.empVideoSamplePath = file_path
      await user?.save()

      return response.json({
        status: true,
        message: 'Sample video has been uploaded.',
      })
    } catch (error) {
      console.log(error)
      return response.json({
        status: false,
        message: error.messages,
      })
    }
  }
}
