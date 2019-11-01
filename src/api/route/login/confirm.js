import { TokenInserter } from '../../worker'

import {
  ResponseComposer,
  TokenCreator,
  TokenDeleter,
  UserUpdater
} from './confirm/worker'

export function confirm () {
  const responseComposer = new ResponseComposer({
    id: 'auth-login-confirm-response-composer'
  })

  const tokenCreator = new TokenCreator({
    id: 'auth-login-confirm-token-creatr'
  })

  const tokenDeleter = new TokenDeleter({
    id: 'auth-login-confirm-token-deleter'
  })

  const tokenInserter = new TokenInserter({
    id: 'auth-login-confirm-token-inserter'
  })

  const userUpdater = new UserUpdater({
    id: 'auth-login-confirm-user-updater'
  })

  tokenDeleter
    .connect(tokenCreator)
    .connect(tokenInserter)
    .connect(userUpdater)
    .connect(responseComposer)

  return [tokenDeleter, responseComposer]
}
