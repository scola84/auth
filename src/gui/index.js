import '../cmn/locale'
import './style'
import * as route from './route'
import * as helper from './helper'

export function setup (workers) {
  helper.setup(workers)

  Object.keys(route).forEach((name) => {
    route[name](workers)
  })
}
