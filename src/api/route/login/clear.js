import {
  ResponseComposer,
  TokenDeleter
} from './clear/worker'

export function clear () {
  const responseComposer = new ResponseComposer({
    id: 'auth-login-request-response-composer'
  })

  const tokenDeleter = new TokenDeleter({
    id: 'auth-login-request-token-deleter'
  })

  tokenDeleter
    .connect(responseComposer)

  return [tokenDeleter, responseComposer]
}
