import { HtmlBuilder } from '@scola/lib'
import '../cmn/locale'
import './style'
import * as route from './route'

import {
  AuthStarter,
  LoginHandler,
  LogoutHandler
} from './helper'

export function setup (workers) {
  Object.keys(route).forEach((name) => {
    route[name](workers)
  })

  const {
    main,
    menu,
    pop
  } = workers

  HtmlBuilder.snippet.misc.Call.setHandler('authLogout', new LogoutHandler({
    routers: workers
  }))

  HtmlBuilder.snippet.misc.Call.setHandler('authLogin', new LoginHandler({
    routers: workers
  }))

  main.setStarter(false)
  menu.setStarter(false)

  pop.setStarter(new AuthStarter({
    routers: workers
  }))
}
