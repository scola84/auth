import { randomBytes } from 'crypto'
import { AuthWorker } from '../../../../worker'

export class TokenCreator extends AuthWorker {
  act (box, data) {
    const hash = box.request.getHeader('x-ua')
    const setting = this.formatSetting(data.remember)

    box.user.addAgent({
      date: new Date().toISOString(),
      hash
    })

    box.user.setToken({
      duration: this.createDuration(box.user, setting),
      expires: this.createExpires(box.user, setting),
      scope: '/api/l1',
      value: randomBytes(32).toString('hex'),
      remember: data.remember
    })

    this.pass(box, data)
  }

  formatSetting (remember) {
    let setting = 'session'

    if (remember === 'on') {
      setting = 'remember'
    }

    return `auth.login.expires.l1.${setting}`
  }
}
