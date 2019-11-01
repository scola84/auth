import {
  TokenInserter
} from '../../worker'

import {
  PasswordVerifier,
  ResponseComposer,
  TokenCreator
} from './upgrade/worker'

export function upgrade () {
  const passwordVerifier = new PasswordVerifier({
    id: 'auth-login-upgrade-password-verifier'
  })

  const responseComposer = new ResponseComposer({
    id: 'auth-login-upgrade-response-composer'
  })

  const tokenCreator = new TokenCreator({
    id: 'auth-login-upgrade-token-creator'
  })

  const tokenInserter = new TokenInserter({
    id: 'auth-login-upgrade-token-inserter'
  })

  passwordVerifier
    .connect(tokenCreator)
    .connect(tokenInserter)
    .connect(responseComposer)

  return [passwordVerifier, responseComposer]
}
