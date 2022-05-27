import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    try {
      const userSchema = schema.create({
        email: schema.string([rules.email()]),
        password: schema.string(),
      })

      const { email, password } = await request.validate({ schema: userSchema })
      try {
        var { token } = await auth.attempt(email, password)
      } catch (err) {
        return response.json({
          status: false,
          message: 'Email or password is incorrect.',
        })
      }
      const user = await User.query().where('email', email).preload('devices').preload('company').first()
      user!.accessToken = token
      return response.json({
        status: true,
        message: 'Logged in successfully',
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
}
