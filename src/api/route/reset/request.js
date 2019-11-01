import { Broadcaster } from '@scola/lib'
import { TokenInserter } from '../../worker'

import {
  InputValidator,
  ResponseComposer,
  TokenCreator,
  TokenSender,
  UserSelector
} from './request/worker'

export function request () {
  const broadcaster = new Broadcaster({
    id: 'auth-reset-request-broadcaster'
  })

  const inputValidator = new InputValidator({
    id: 'auth-reset-request-input-validator'
  })

  const responseComposer = new ResponseComposer({
    id: 'auth-reset-request-response-composer'
  })

  const tokenCreator = new TokenCreator({
    id: 'auth-reset-request-token-creator'
  })

  const tokenInserter = new TokenInserter({
    id: 'auth-reset-request-token-inserter'
  })

  const tokenSender = new TokenSender({
    id: 'auth-reset-request-token-sender',
    name: 'smtp'
  })

  const userSelector = new UserSelector({
    id: 'auth-reset-request-user-selector'
  })

  broadcaster
    .connect(responseComposer)

  broadcaster
    .connect(inputValidator)
    .connect(userSelector)
    .connect(tokenCreator)
    .connect(tokenInserter)
    .connect(tokenSender)

  return [broadcaster, responseComposer]
}
