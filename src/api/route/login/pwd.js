import { KeyStore } from '../../helper'

import {
  PwdEmailSender,
  PwdPasswordVerifier,
  PwdResponseComposer,
  PwdTokenIssuer,
  PwdUserSelector
} from '../../worker'

export function buildPwd () {
  const emailSender = new PwdEmailSender({
    host: 'email',
    id: 'auth-login-pwd-email-sender'
  })

  const passwordVerifier = new PwdPasswordVerifier({
    id: 'auth-login-pwd-password-verifier'
  })

  const responseComposer = new PwdResponseComposer({
    id: 'auth-login-pwd-response-composer'
  })

  const tokenIssuer = new PwdTokenIssuer({
    id: 'auth-login-pwd-token-issuer',
    keyStore: new KeyStore()
  })

  const userSelector = new PwdUserSelector({
    id: 'auth-login-pwd-user-selector'
  })

  userSelector
    .connect(passwordVerifier)
    .connect(tokenIssuer)
    .connect(emailSender)
    .connect(responseComposer)

  return [userSelector, responseComposer]
}
