import { Worker } from '@scola/lib'

export class AuthWorker extends Worker {
  createCookie (token = '', expires = 0) {
    return [
      `Authorization=${token}`,
      `Expires=${expires > 0 ? new Date(expires).toUTCString() : expires}`,
      'HttpOnly',
      'Path=/'
    ].join(';')
  }

  fail (box, error) {
    box.response.setHeader('Set-Cookie', this.createCookie())
    super.fail(box, new Error(`401 Unauthorized (${error.message})`))
  }
}
