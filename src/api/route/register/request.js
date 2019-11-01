import { TokenInserter } from '../../worker'

import {
  InputValidator,
  PasswordHasher,
  ResponseComposer,
  TokenCreator,
  TokenSender,
  UserInserter,
  UserSelector
} from './request/worker'

export function request () {
  const inputValidator = new InputValidator({
    id: 'auth-register-request-input-validator'
  })

  const passwordHasher = new PasswordHasher({
    id: 'auth-register-request-password-hasher'
  })

  const responseComposer = new ResponseComposer({
    id: 'auth-register-request-response-composer'
  })

  const tokenCreator = new TokenCreator({
    id: 'auth-register-request-token-creator'
  })

  const tokenInserter = new TokenInserter({
    id: 'auth-register-request-token-inserter'
  })

  const tokenSender = new TokenSender({
    id: 'auth-register-request-token-sender',
    name: 'smtp'
  })

  const userInserter = new UserInserter({
    id: 'auth-register-request-user-selector'
  })

  const userSelector = new UserSelector({
    id: 'auth-register-request-user-selector'
  })

  inputValidator
    .connect(userSelector)
    .connect(passwordHasher)
    .connect(userInserter)
    .connect(tokenCreator)
    .connect(tokenInserter)
    .connect(tokenSender)
    .connect(responseComposer)

  return [inputValidator, responseComposer]
}
