import { Worker } from '@scola/lib'

export class AuthWorker extends Worker {
  createCookie (token) {
    return [
      `Authorization=${this.createCookieBearer(token)}`,
      `Expires=${this.createCookieExpires(token)}`,
      'HttpOnly',
      'Path=/',
      'SameSite=Strict'
    ].join(';')
  }

  createCookieBearer (token = null) {
    if (token === null) {
      return ''
    }

    return `Bearer ${token.toBearer()}`
  }

  createCookieExpires (token = null) {
    if (token === null) {
      return 0
    }

    if (token.getRemember() !== 'on') {
      return 0
    }

    return token.getExpires().toUTCString()
  }

  createDuration (user, setting) {
    return user.getRole().getSetting(setting) ||
      this.getConfig(setting) ||
      60 * 60 * 1000
  }

  createExpires (user, setting) {
    return new Date(Date.now() + this.createDuration(user, setting))
  }

  setCookie (box, token) {
    box.response.setHeader('Set-Cookie', this.createCookie(token))
  }
}
