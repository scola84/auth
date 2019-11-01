import { confirm } from './confirm'
import { request } from './request'

export function login ({ pop }) {
  pop.connect('auth-login-confirm', confirm())
  pop.connect('auth-login-request', request())
}
