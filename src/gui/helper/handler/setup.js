import { HtmlBuilder } from '@scola/lib'
import { EnterHandler } from './enter'
import { ExitHandler } from './exit'
import { RequestHandler } from './request'
import { UpgradeHandler } from './upgrade'

export function setup (routers) {
  HtmlBuilder.snippet.action.Call.setHandler('auth-enter', new EnterHandler({
    routers
  }))

  HtmlBuilder.snippet.action.Call.setHandler('auth-exit', new ExitHandler({
    routers
  }))

  HtmlBuilder.snippet.action.Call.setHandler('auth-request', new RequestHandler())
  HtmlBuilder.snippet.action.Call.setHandler('auth-upgrade', new UpgradeHandler())

  HtmlBuilder.snippet.widget.RequestResource.setLevel('l1')
}
