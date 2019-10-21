import { parseHeader } from '@scola/lib'
import { verify } from 'jsonwebtoken'
import { AuthWorker } from '../auth'

export class GateTokenVerifier extends AuthWorker {
  constructor (options = {}) {
    super(options)

    this._keyStore = null
    this.setKeyStore(options.keyStore)
  }

  getKeyStore () {
    return this._keyStore
  }

  setKeyStore (value = null) {
    this._keyStore = value
    return this
  }

  act (box, data) {
    this.verifyToken(box, data, (error) => {
      if (error !== null) {
        this.fail(box, error)
        return
      }

      this.pass(box, data)
    })
  }

  getKey (header, callback) {
    this._keyStore.getPublicKey(header.kid, (error, key = {}) => {
      callback(error, key.pem)
    })
  }

  verifyToken (box, data, callback) {
    const cookie = parseHeader(box.request.headers.cookie)
    let auth = cookie.Authorization

    if (auth === undefined) {
      auth = box.request.headers.authorization
    }

    const token = auth === undefined ? '' : auth.slice(7)

    if (token === '') {
      if (box.request.url.pathname === '/api/auth/login/pwd') {
        callback(null)
        return
      }

      callback(new Error('Bearer not found'))
      return
    }

    const options = {
      issuer: this._config.auth.iss
    }

    verify(token, (h, c) => this.getKey(h, c), options, (error, payload) => {
      if (error) {
        callback(error)
        return
      }

      if (payload.otp === false) {
        if (box.request.url.pathname !== '/api/auth/login/otp') {
          callback(new Error('MFA not completed'))
          return
        }
      }

      box.user = {
        exp: payload.exp,
        remember: payload.mem,
        user_id: payload.uid
      }

      callback(null)
    })
  }
}
