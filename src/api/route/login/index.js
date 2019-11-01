import { TokenChecker } from '../gate/worker'
import { check } from './check'
import { clear } from './clear'
import { confirm } from './confirm'
import { request } from './request'
import { upgrade } from './upgrade'

export function login ({ router, responder }) {
  TokenChecker.exclude('agent', '/api/l1/auth/login/confirm')
  TokenChecker.exclude('expires', '/api/l1/auth/login/clear')
  TokenChecker.exclude('scope', '/api/l1/auth/login/upgrade')

  router
    .connect('GET ^/api/l1/auth/login/check$', check())
    .connect(responder)

  router
    .connect('POST ^/api/l1/auth/login/clear$', clear())
    .connect(responder)

  router
    .connect('POST ^/api/l1/auth/login/confirm$', confirm())
    .connect(responder)

  router
    .connect('POST ^/api/l0/auth/login/request$', request())
    .connect(responder)

  router
    .connect('POST ^/api/l1/auth/login/upgrade$', upgrade())
    .connect(responder)
}
