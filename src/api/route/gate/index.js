import {
  TokenChecker,
  TokenDeleter,
  TokenSelector
} from './worker'

export function gate ({ router }) {
  const tokenChecker = new TokenChecker({
    id: 'auth-gate-token-checker'
  })

  const tokenDeleter = new TokenDeleter({
    id: 'auth-gate-token-deleter'
  })

  const tokenSelector = new TokenSelector({
    id: 'auth-gate-token-selector'
  })

  router.prepend(tokenSelector)
  router.prepend(tokenChecker)
  router.prepend(tokenDeleter)
}
