import { verify } from 'argon2'
import { AuthWorker } from '../auth'

export class PwdPasswordVerifier extends AuthWorker {
  act (box, data) {
    this.verifyPassword(box, data, (error) => {
      if (error !== null) {
        this.fail(box, error)
        return
      }

      this.pass(box, data)
    })
  }

  expect () {
    return [null, {
      password: 'string',
      pwd: 'string'
    }]
  }

  async verifyPassword (box, data, callback) {
    try {
      if (await verify(data.pwd, data.password) === false) {
        callback(new Error('Password is invalid'))
        return
      }
    } catch (error) {
      callback(error)
      return
    }

    callback(null)
  }
}
