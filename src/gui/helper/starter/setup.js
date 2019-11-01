import { AuthStarter } from './auth'

export function setup ({ main, menu, pop }) {
  main.setStarter(false)
  menu.setStarter(false)

  pop.setStarter(new AuthStarter({
    routers: { main, menu, pop }
  }))
}
