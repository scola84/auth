export class ExitHandler {
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
    const {
      pop
    } = this._routers

    pop
      .getStarter()
      .logoutUser()
  }
}
