import { ResponseComposer } from './check/worker'

export function check () {
  const responseComposer = new ResponseComposer({
    id: 'auth-login-check-response-composer'
  })

  return responseComposer
}
