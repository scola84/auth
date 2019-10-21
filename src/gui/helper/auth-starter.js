import { User } from '../../cmn/helper'

export class AuthStarter {
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

  loadUser () {
    let user = window.localStorage.getItem('user')

    if (user === null) {
      user = window.sessionStorage.getItem('user')
    }

    return user === null ? user : new User(JSON.parse(user))
  }

  showAppMain (user) {
    const { main } = this._routers
    let route = main.unstash()

    if (route === null) {
      route = main.previous()
    }

    if (route === null) {
      route = '@self:def'
    }

    main
      .setUser(user)
      .route(route, {})

    this.showAppMenu(user)
  }

  showAppMenu (user) {
    const { menu } = this._routers
    let route = menu.unstash()

    if (route === null) {
      route = menu.previous()
    }

    if (route === null) {
      route = '@self:def'
    }

    menu
      .setUser(user)
      .route(route, {})

    this.showAppPopup(user)
  }

  showAppPopup (user) {
    const { pop } = this._routers
    let route = pop.unstash()

    if (route === null) {
      route = pop.previous()
    }

    if (route === null) {
      route = '@self:def'
    } else if (route.path === 'login-pwd') {
      route = '@self:clr'
    } else {
      route.options.clr = true
      route.options.imm = false
      route.options.lck = false
    }

    pop
      .setUser(user)
      .route(route, {})
  }

  showPwdMain (context) {
    const { main } = this._routers

    if (context === 'browser') {
      main.stash()
    }

    main
      .setUser()
      .route('@self:clr', {})

    this.showPwdMenu(context)
  }

  showPwdMenu (context) {
    const { menu } = this._routers

    if (context === 'browser') {
      menu.stash()
    }

    menu
      .setUser()
      .route('@self:clr', {})

    this.showPwdPop(context)
  }

  showPwdPop (context) {
    const { pop } = this._routers

    if (context === 'browser') {
      pop.stash()
    }

    pop
      .setUser()
      .route('login-pwd@self:clr&lck&imm', {})
  }

  start (context = 'browser') {
    const user = this.loadUser()

    if (user === null) {
      this.showPwdMain(context)
    } else {
      this.showAppMain(user)
    }
  }
}
