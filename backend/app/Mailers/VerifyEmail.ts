import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Account from 'App/Models/Account'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'

export default class VerifyEmail extends BaseMailer {
  constructor(
    private user: Account,
    private token: string
  ) {
    super()
  }
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "VerifyEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message
      .subject('Verify your CIRA Email')
      .from('noreply@cira.com')
      .to(this.user.email)
      .html(
        `Please click the following link to verify your email
        <a href="${Env.get('CLIENT_DOMAIN')}/verify-email?t=${this.token}">Verify Email</a>
        `
      )
  }
}
