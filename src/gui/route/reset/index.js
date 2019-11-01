import { confirm } from './confirm'
import { request } from './request'

export function reset ({ pop }) {
  pop.connect('auth-reset-confirm', confirm())
  pop.connect('auth-reset-request', request())
}
