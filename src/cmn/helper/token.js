export class Token {
  constructor (options = {}) {
    this._confirm = null
    this._duration = null
    this._expires = null
    this._id = null
    this._remember = null
    this._scope = null
    this._value = null

    this.setConfirm(options.confirm)
    this.setDuration(options.duration)
    this.setExpires(options.expires)
    this.setId(options.id)
    this.setRemember(options.remember)
    this.setScope(options.scope)
    this.setValue(options.value)
  }

  toObject () {
    return {
      confirm: this._confirm,
      duration: this._duration,
      expires: this._expires,
      id: this._id,
      remember: this._remember,
      scope: this._scope,
      value: this._value
    }
  }

  toBearer () {
    return `${this._id}-${this._value}`
  }

  getConfirm () {
    return this._confirm
  }

  setConfirm (value = false) {
    this._confirm = value
    return this
  }

  mustConfirm () {
    return this._confirm === true
  }

  getDuration () {
    return this._confirm
  }

  setDuration (value = 0) {
    this._duration = value
    return this
  }

  getExpires () {
    return this._expires
  }

  setExpires (value = null) {
    this._expires = value
    return this
  }

  isBeforeExpires () {
    return new Date() < this._expires
  }

  getId () {
    return this._id
  }

  setId (value = null) {
    this._id = value
    return this
  }

  getRemember () {
    return this._remember
  }

  setRemember (value = null) {
    this._remember = value
    return this
  }

  getScope () {
    return this._scope
  }

  setScope (value = '/') {
    this._scope = value
    return this
  }

  hasScope (request) {
    return request.url.pathname.match(this._scope) !== null
  }

  getValue () {
    return this._value
  }

  setValue (value = null) {
    this._value = value
    return this
  }

  hasValue (token) {
    return this._value === token.value
  }

  sliceBase (index = -7) {
    return this.toBearer().slice(0, index)
  }

  sliceCode (index = -7) {
    return this.toBearer().slice(index)
  }
}
