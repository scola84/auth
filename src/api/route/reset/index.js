import { TokenChecker } from '../gate/worker'
import { check } from './check'
import { confirm } from './confirm'
import { request } from './request'

export function reset ({ router, responder }) {
  TokenChecker.exclude('agent', '/api/l1/auth/reset/check')
  TokenChecker.exclude('agent', '/api/l1/auth/reset/confirm')

  router
    .connect('GET ^/api/l1/auth/reset/check$', check())
    .connect(responder)

  router
    .connect('POST ^/api/l1/auth/reset/confirm$', confirm())
    .connect(responder)

  router
    .connect('POST ^/api/l0/auth/reset/request$', request())
    .connect(responder)
}
