import { sign } from 'jsonwebtoken'
import { AuthWorker } from '../auth'

export class OtpTokenIssuer extends AuthWorker {
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
    this.issueToken(box, data, (error) => {
      if (error !== null) {
        this.fail(box, error)
        return
      }

      this.pass(box, data)
    })
  }

  issueToken (box, data, callback) {
    this._keyStore.getPrivateKey((storeError, key) => {
      if (storeError !== null) {
        callback(storeError)
        return
      }

      const payload = {
        exp: box.user.exp,
        iss: this._config.auth.iss,
        mem: box.user.remember,
        otp: true,
        uid: box.user.user_id
      }

      const options = {
        algorithm: key.alg,
        keyid: key.kid
      }

      sign(payload, key.pem, options, (signError = null, token = null) => {
        if (signError !== null) {
          callback(signError)
          return
        }

        const expires = payload.mem === true ? payload.exp * 1000 : 0
        const cookie = this.createCookie(`Bearer ${token}`, expires)

        box.response.setHeader('Set-Cookie', cookie)

        callback(null)
      })
    })
  }
}
