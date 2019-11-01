import { verify } from 'argon2'
import { AuthWorker } from '../../../../worker'

export class PasswordVerifier extends AuthWorker {
  act (box, data) {
    this.verifyPassword(box, data, (error) => {
      if (error !== null) {
        this.fail(box, error)
        return
      }

      this.pass(box, data)
    })
  }

  async verifyPassword (box, data, callback) {
    let { password } = data

    if (password === undefined || password === null) {
      password = ''
    }

    try {
      if (await verify(box.user.getPassword(), password) === true) {
        callback(null)
      } else {
        callback(new Error('401 [auth-upgrade] Password is invalid'))
      }
    } catch (error) {
      callback(error)
    }
  }
}
