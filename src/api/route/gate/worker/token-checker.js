import { AuthWorker } from '../../../worker'

const exclude = {}
const include = {}

export class TokenChecker extends AuthWorker {
  static exclude (name, ...path) {
    exclude[name] = (exclude[name] || []).concat(path)
  }

  static include (name, path) {
    include[name] = (include[name] || []).concat(path)
  }

  act (box, data) {
    const { user } = box
    const token = user.getToken()

    if (token.hasValue(box.token) === false) {
      this.setCookie(box)
      this.fail(box, new Error('401 [auth-logout] Token is invalid'))
      return
    }

    if (token.hasScope(box.request) === false) {
      if (this.mustCheck(box.request, 'scope') === true) {
        this.fail(box, new Error('401 [auth-upgrade] Token is out of scope'))
        return
      }
    }

    if (token.isBeforeExpires() === false) {
      if (this.mustCheck(box.request, 'expires') === true) {
        this.setCookie(box)
        this.fail(box, new Error('401 [auth-request] Token is expired'))
        return
      }
    }

    if (user.hasAgent(box.request) === false) {
      if (this.mustCheck(box.request, 'agent') === true) {
        this.setCookie(box)
        this.fail(box, new Error('401 [auth-logout] Agent is invalid'))
        return
      }
    }

    this.pass(box, data)
  }

  decide (box) {
    return box.user !== undefined
  }

  err (box, error) {
    this.setCookie(box)
    this.fail(box, error)
  }

  mustCheck (request, name) {
    const { pathname } = request.url

    if ((include[name] || []).some((p) => pathname.match(p) !== null) === true) {
      return true
    }

    if ((exclude[name] || []).every((p) => pathname.match(p) === null) === true) {
      return true
    }

    return false
  }
}
