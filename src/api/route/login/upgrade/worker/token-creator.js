import { randomBytes } from 'crypto'
import { AuthWorker } from '../../../../worker'

export class TokenCreator extends AuthWorker {
  act (box, data) {
    const setting = this.formatSetting()

    box.user.setToken({
      duration: this.createDuration(box.user, setting),
      expires: this.createExpires(box.user, setting),
      scope: '/api/l2/',
      value: randomBytes(32).toString('hex')
    })

    this.pass(box, data)
  }

  formatSetting () {
    return 'auth.login.expires.l2'
  }
}
