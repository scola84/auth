import { confirm } from './confirm'
import { request } from './request'

export function register ({ pop }) {
  pop.connect('auth-register-confirm', confirm())
  pop.connect('auth-register-request', request())
}
