import '../cmn/locale'
import * as route from './route'

export function setup (workers) {
  Object.keys(route).forEach((name) => {
    route[name](workers)
  })
}
