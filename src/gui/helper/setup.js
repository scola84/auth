import { setup as setupHandler } from './handler'
import { setup as setupStarter } from './starter'

export function setup (workers) {
  setupHandler(workers)
  setupStarter(workers)
}
