import { TokenInserter } from '../../worker'

import {
  InputValidator,
  PasswordVerifier,
  ResponseComposer,
  TokenCreator,
  TokenSender,
  UserSelector
} from './request/worker'

export function request () {
  const inputValidator = new InputValidator({
    id: 'auth-login-request-input-validator'
  })

  const passwordVerifier = new PasswordVerifier({
    id: 'auth-login-request-password-verifier'
  })

  const responseComposer = new ResponseComposer({
    id: 'auth-login-request-response-composer'
  })

  const tokenCreator = new TokenCreator({
    id: 'auth-login-request-token-creator'
  })

  const tokenInserter = new TokenInserter({
    id: 'auth-login-request-token-inserter'
  })

  const tokenSender = new TokenSender({
    id: 'auth-login-request-token-sender',
    name: 'smtp'
  })

  const userSelector = new UserSelector({
    id: 'auth-login-request-user-selector'
  })

  inputValidator
    .connect(userSelector)
    .connect(passwordVerifier)
    .connect(tokenCreator)
    .connect(tokenInserter)
    .connect(tokenSender)
    .connect(responseComposer)

  return [inputValidator, responseComposer]
}
