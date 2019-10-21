import { buildOtp } from './otp'
import { buildPwd } from './pwd'

export function login ({ router, responder }) {
  router
    .connect('POST ^/api/auth/login/pwd$', buildPwd())
    .connect(responder)

  router
    .connect('POST ^/api/auth/login/otp$', buildOtp())
    .connect(responder)
}
