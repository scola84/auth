import { KeyStore } from '../../helper'

import {
  OtpTokenIssuer,
  OtpTokenVerifier,
  OtpUserSelector
} from '../../worker'

export function buildOtp () {
  const tokenIssuer = new OtpTokenIssuer({
    id: 'auth-login-otp-token-issuer',
    keyStore: new KeyStore(),
    merge: () => {}
  })

  const tokenVerifier = new OtpTokenVerifier({
    id: 'auth-login-otp-token-verifier',
    keyStore: new KeyStore()
  })

  const userSelector = new OtpUserSelector({
    id: 'auth-login-otp-user-selector'
  })

  userSelector
    .connect(tokenVerifier)
    .connect(tokenIssuer)

  return [userSelector, tokenIssuer]
}
