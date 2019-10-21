export class User {
  constructor (options = {}) {
    this._id = null
    this.setId(options.id || options.user_id)
  }

  getId () {
    return this._id
  }

  setId (value = null) {
    this._id = value
    return this
  }

  may () {
    return true
  }
}
