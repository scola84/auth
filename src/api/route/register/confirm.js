import {
  ResponseComposer,
  TokenDeleter,
  UserUpdater
} from './confirm/worker'

export function confirm () {
  const responseComposer = new ResponseComposer({
    id: 'auth-register-confirm-response-composer'
  })

  const tokenDeleter = new TokenDeleter({
    id: 'auth-register-confirm-token-deleter'
  })

  const userUpdater = new UserUpdater({
    id: 'auth-register-confirm-user-updater'
  })

  userUpdater
    .connect(tokenDeleter)
    .connect(responseComposer)

  return [userUpdater, responseComposer]
}
