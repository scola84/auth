export class LogoutHandler {
  constructor (options = {}) {
    this._routers = null
    this.setRouters(options.routers)
  }

  getRouters () {
    return this._routers
  }

  setRouters (value = {}) {
    this._routers = value
    return this
  }

  handle () {
    this.removeUser()

    const {
      pop
    } = this._routers

    pop.start('user')
  }

  removeUser () {
    window.localStorage.removeItem('user')
    window.sessionStorage.removeItem('user')
  }
}
