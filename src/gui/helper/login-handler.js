export class LoginHandler {
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

  handle (box, data) {
    this.saveUser(data.user)

    const {
      pop
    } = this._routers

    pop.start('user')
  }

  saveUser (user) {
    const string = JSON.stringify(user)

    if (user.mem === true) {
      window.localStorage.setItem('user', string)
    } else {
      window.sessionStorage.setItem('user', string)
    }
  }
}
