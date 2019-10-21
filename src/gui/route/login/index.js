import { buildOtp } from './otp'
import { buildPwd } from './pwd'

export function login ({ pop }) {
  pop.connect('login-otp', buildOtp())
  pop.connect('login-pwd', buildPwd())
}
