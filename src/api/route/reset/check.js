import { ResponseComposer } from './check/worker'

export function check () {
  const responseComposer = new ResponseComposer({
    id: 'auth-reset-check-response-composer'
  })

  return responseComposer
}
