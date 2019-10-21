import Cryptr from 'cryptr'
import { authenticator } from 'otplib'
import { AuthWorker } from '../auth'

export class OtpTokenVerifier extends AuthWorker {
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

  expect () {
    return [null, {
      token: 'string',
      otp: 'string'
    }]
  }

  verify (data, key) {
    const otp = JSON.parse(new Cryptr(key.pem).decrypt(data.otp))

    if (data.token[5] === '-') {
      if (otp.backup.indexOf(data.token) === -1) {
        throw new Error('Backup code is invalid')
      }
    } else if (authenticator(data.token, otp.key) === false) {
      throw new Error('OTP is invalid')
    }
  }

  verifyToken (box, data, callback) {
    this._keyStore.getPrivateKey((storeError, key) => {
      if (storeError !== null) {
        callback(storeError)
        return
      }

      try {
        this.verify(data, key)
        callback(null)
      } catch (error) {
        callback(error)
      }
    })
  }
}
