import {
  InputValidator,
  PasswordHasher,
  ResponseComposer,
  TokenDeleter,
  UserUpdater
} from './confirm/worker'

export function confirm () {
  const inputValidator = new InputValidator({
    id: 'auth-reset-confirm-input-validator'
  })

  const passwordHasher = new PasswordHasher({
    id: 'auth-reset-confirm-password-hasher'
  })

  const responseComposer = new ResponseComposer({
    id: 'auth-reset-confirm-response-composer'
  })

  const tokenDeleter = new TokenDeleter({
    id: 'auth-reset-confirm-token-deleter'
  })

  const userUpdater = new UserUpdater({
    id: 'auth-reset-confirm-user-updater'
  })

  inputValidator
    .connect(passwordHasher)
    .connect(userUpdater)
    .connect(tokenDeleter)
    .connect(responseComposer)

  return [inputValidator, responseComposer]
}
