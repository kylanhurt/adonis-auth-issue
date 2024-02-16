import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/Account'

export default class AuthController {
  public async signup({ request, response, auth }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string([rules.email(), rules.trim()]),
      password: schema.string([rules.minLength(8)]),
    })

    const data = await request.validate({ schema: userSchema })
    const user = await User.create(data)

    await auth.login(user, true)

    return response.status(201)
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    try {
      await auth.use('web').attempt(email, password, true)
    } catch (_error) {
      return response.status(401).json({
        message: 'Email or password is incorrect',
      })
    }
    return response.status(200).json(auth.user)
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.redirect().toPath('/')
  }
}
