import get from 'lodash-es/get'
import merge from 'lodash-es/merge'

export class Role {
  constructor (options = {}) {
    this._id = null
    this._permissions = null
    this._settings = null

    this.setPermissions(options.permissions)
    this.setId(options.id)
    this.setSettings(options.settings)
  }

  toObject () {
    return {
      id: this._id,
      permissions: this.getPermissions()
    }
  }

  getId () {
    return this._id
  }

  setId (value = null) {
    this._id = value
    return this
  }

  getPermissions () {
    this._permissions = typeof this._permission === 'string'
      ? JSON.parse(this._permissions)
      : this._permissions

    return this._permissions
  }

  setPermissions (value = null) {
    if (this._permissions === null) {
      this._permissions = {}
    }

    merge(this.getPermissions(), value)
    return this
  }

  getPermission (path) {
    return get(this.getPermissions(), path)
  }

  hasPermission (permission) {
    return this.getPermissions()[permission] === 1
  }

  getSettings () {
    this._settings = typeof this._settings === 'string'
      ? JSON.parse(this._settings)
      : this._settings

    return this._settings
  }

  setSettings (value = null) {
    if (this._settings === null) {
      this._settings = {}
    }

    merge(this.getSettings(), value)
    return this
  }

  getSetting (path) {
    return get(this.getSettings(), path)
  }
}
