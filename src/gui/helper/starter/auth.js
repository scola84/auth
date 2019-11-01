import { HtmlBuilder, HtmlRouter, HttpClient } from '@scola/lib'
import fingerprint from 'fingerprintjs2'
import { User } from '../../../cmn/helper'

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

  checkLoginToken (caller, user) {
    HttpClient.request('GET /api/l1/auth/login/check', (error) => {
      if (error !== null) {
        this.removeUser()
        this.showAuth(caller, 'auth-login-request')
        return
      }

      this.showApp(user)
    })
  }

  checkResetToken (caller, { bearer }) {
    const resource = {
      meta: {
        headers: {
          Authorization: `Bearer ${bearer}`
        },
        url: '/api/l1/auth/reset/check'
      }
    }

    HttpClient.request(resource, (error, data) => {
      if (error !== null) {
        this.removeUser()
        this.showAuth(caller, 'auth-reset-request', {
          status: 'failure.reset.check'
        })
        return
      }

      this.showAuth(caller, `auth-reset-confirm:bearer=${bearer}`, data)
    })
  }

  clearLoginToken (caller) {
    if (caller === 'browser') {
      this.showAuth(caller, 'auth-login-request')
      return
    }

    HttpClient.request('POST /api/l1/auth/login/clear', () => {
      this.showAuth(caller, 'auth-login-request')
    })
  }

  confirmRegisterToken (caller, { bearer }) {
    const resource = {
      meta: {
        headers: {
          Authorization: `Bearer ${bearer}`
        },
        method: 'POST',
        url: '/api/l1/auth/register/confirm'
      }
    }

    HttpClient.request(resource, (error, data) => {
      if (error !== null) {
        this.removeUser()
        this.showAuth(caller, 'auth-register-confirm', {
          status: 'failure'
        })
        return
      }

      this.showAuth(caller, 'auth-register-confirm', {
        status: 'success'
      })
    })
  }

  loadAgent (callback) {
    const wait = window.requestIdleCallback || window.setTimeout

    wait(() => {
      const options = {
        excludes: {
          adBlock: true,
          enumerateDevices: true,
          pixelRatio: true,
          doNotTrack: true,
          fontsFlash: true
        }
      }

      fingerprint.get(options, (parts) => {
        const hash = fingerprint.x64hash128(parts.map((part) => {
          return part.value
        }).join())

        HttpClient.setMeta({
          headers: {
            'X-UA': hash
          }
        })

        callback()
      })
    })
  }

  loadUser () {
    let user = window.localStorage.getItem('user')

    if (user === null) {
      user = window.sessionStorage.getItem('user')
    }

    if (user === null) {
      return null
    }

    try {
      return new User(JSON.parse(user))
    } catch (error) {
      return null
    }
  }

  loginUser (user, remember) {
    this.saveUser(user, remember)
    this.start('user')
  }

  logoutUser () {
    this.removeUser()
    this.start('user')
  }

  removeUser () {
    window.localStorage.removeItem('user')
    window.sessionStorage.removeItem('user')
  }

  saveUser (user = null, remember = '') {
    if (user === null) {
      return
    }

    const string = JSON.stringify(user)

    if (remember === 'on') {
      window.localStorage.setItem('user', string)
    } else {
      window.sessionStorage.setItem('user', string)
    }
  }

  showApp (user) {
    this.showAppMain(user)
    this.showAppMenu(user)
    this.showAppPopup(user)

    HtmlBuilder
      .querySelector('.app')
      .classed('in', true)
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
  }

  showAppPopup (user) {
    const { pop } = this._routers
    let route = pop.unstash()

    if (route === null) {
      route = pop.previous()
    }

    if (route === null) {
      route = '@self:def'
    } else if (route.path.match(/^auth-/) !== null) {
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

  showAuth (caller, route, data) {
    const app = HtmlBuilder.querySelector('.app')

    app.on('transitionend.scola-auth-login', () => {
      app.on('.scola-auth-login', null)
      this.showAuthMain(caller)
      this.showAuthMenu(caller)
    })

    app.classed('in', false)

    const duration = parseFloat(app.style('transition-duration'))

    if (caller === 'browser' || duration === 0) {
      app.dispatch('transitionend')
    }

    this.showAuthPop(caller, `${route}@self:clr&lck&imm`, data)
  }

  showAuthMain (caller) {
    const { main } = this._routers

    if (caller === 'browser') {
      main.stash()
    }

    main
      .setUser()
      .route('@self:clr', {})
  }

  showAuthMenu (caller) {
    const { menu } = this._routers

    if (caller === 'browser') {
      menu.stash()
    }

    menu
      .setUser()
      .route('@self:clr', {})
  }

  showAuthPop (caller, route, data) {
    const { pop } = this._routers

    if (caller === 'browser') {
      pop.stash()
    }

    pop
      .setUser()
      .route(route, data)
  }

  start (caller = 'browser') {
    this.loadAgent(() => {
      const routes = HtmlRouter.parseHash()
      const user = this.loadUser()

      if (routes.pop && routes.pop.path === 'auth-reset-confirm') {
        this.checkResetToken(caller, routes.pop.params)
      } else if (routes.pop && routes.pop.path === 'auth-register-confirm') {
        this.confirmRegisterToken(caller, routes.pop.params)
      } else if (user === null) {
        this.clearLoginToken(caller)
      } else {
        this.checkLoginToken(caller, user)
      }
    })
  }
}
