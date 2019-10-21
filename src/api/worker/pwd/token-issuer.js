import Cryptr from 'cryptr'
import { sign } from 'jsonwebtoken'
import { authenticator } from 'otplib'
import { AuthWorker } from '../auth'

export class PwdTokenIssuer extends AuthWorker {
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

  expect () {
    return [null, {
      otp: 'string',
      remember: 'string',
      user_id: 'number'
    }]
  }

  issueToken (box, data, callback) {
    this._keyStore.getPrivateKey((storeError, key) => {
      if (storeError !== null) {
        callback(storeError)
        return
      }

      const payload = {
        exp: Math.floor((Date.now() + this._config.auth.exp) / 1000),
        iss: this._config.auth.iss,
        mem: data.remember === 'on',
        otp: typeof data.otp === 'string' ? false : null,
        uid: data.user_id
      }

      const options = {
        algorithm: key.alg,
        keyid: key.kid
      }

      if (payload.otp === false) {
        try {
          const otp = JSON.parse(new Cryptr(key.pem).decrypt(data.otp))
          data.method = otp.method
          data.otp = false
          data.token = authenticator.generate(otp.key)
        } catch (error) {
          callback(error)
          return
        }
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
