import { buildGate } from './gate'

export function gate ({ router }) {
  router.prepend(buildGate())
}
