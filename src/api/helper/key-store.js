import { HttpClient, Worker } from '@scola/lib'
import convertJwkToPem from 'jwk-to-pem'
import eachSeries from 'async/eachSeries'

const cache = {}

export class KeyStore {
  constructor (options = {}) {
    this._config = null
    this.setConfig(options.config)
  }

  getConfig () {
    return this._config
  }

  setConfig (value = Worker.config) {
    this._config = value
    return this
  }

  cacheKey (key, callback) {
    try {
      cache[key.kid] = this.transformKey(key)
      callback(null, cache[key.kid])
    } catch (error) {
      callback(error)
    }
  }

  eachKey (id, key, callback) {
    if (key.d !== undefined && id === 'private') {
      callback(null, key)
      return
    }

    if (key.kid !== undefined && key.kid === id) {
      callback(null, key)
      return
    }

    if (key.url !== undefined) {
      this.loadKey(id, key.url, (error, loadedKey) => {
        callback(error, loadedKey)
      })

      return
    }

    callback(null, null)
  }

  getKey (id, callback) {
    if (cache[id] !== undefined) {
      callback(null, cache[id])
      return
    }

    let key = null

    eachSeries(this._config.auth.keys, (eachKey, eachCallback) => {
      if (key !== null) {
        eachCallback()
        return
      }

      this.eachKey(id, eachKey, (error, foundKey) => {
        key = foundKey
        eachCallback(error)
      })
    }, (error = null) => {
      if (error !== null) {
        callback(error)
        return
      }

      if (key === null) {
        callback(new Error('Key not found'))
        return
      }

      this.cacheKey(key, callback)
    })
  }

  getPrivateKey (callback) {
    this.getKey('private', (error, key) => {
      if (error !== null) {
        callback(error)
        return
      }

      callback(null, {
        alg: key.alg,
        kid: key.kid,
        pem: key.private
      })
    })
  }

  getPublicKey (id, callback) {
    this.getKey(id, (error, key) => {
      if (error !== null) {
        callback(error)
        return
      }

      callback(null, {
        alg: key.alg,
        kid: key.kid,
        pem: key.public
      })
    })
  }

  loadKey (id, url, callback) {
    const handler = {
      handleAct: (box, { keys }) => {
        let key = null

        if (Array.isArray(keys) === false) {
          callback(new Error('Keys is not an array'))
          return
        }

        for (let i = 0; i < keys.length; i += 1) {
          key = keys[i]

          if (key.kid === id) {
            break
          } else {
            key = null
          }
        }

        if (key === null) {
          callback(null, null)
          return
        }

        this.cacheKey(key, callback)
      },
      handleErr: (box, error) => {
        callback(error)
      }
    }

    const client = new HttpClient({
      downstream: handler
    })

    client.handle(null, {
      meta: { url }
    })
  }

  transformKey (key) {
    return {
      alg: key.alg,
      kid: key.kid,
      public: convertJwkToPem(key),
      private: convertJwkToPem(key, {
        private: true
      })
    }
  }
}
