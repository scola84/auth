import { TokenChecker } from '../gate/worker'
import { confirm } from './confirm'
import { request } from './request'

export function register ({ router, responder }) {
  TokenChecker.exclude('agent', '/api/l1/auth/register/confirm')

  router
    .connect('POST ^/api/l1/auth/register/confirm$', confirm())
    .connect(responder)

  router
    .connect('POST ^/api/l0/auth/register/request$', request())
    .connect(responder)
}
