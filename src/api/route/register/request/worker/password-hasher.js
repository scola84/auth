import { Worker } from '@scola/lib'
import { hash } from 'argon2'

export class PasswordHasher extends Worker {
  act (box, data) {
    this.hashPassword(box, data, (error) => {
      if (error !== null) {
        this.fail(box, error)
        return
      }

      this.pass(box, data)
    })
  }

  async hashPassword (box, data, callback) {
    try {
      data.password = await hash(data.password)
    } catch (error) {
      callback(error)
      return
    }

    callback(null)
  }
}
