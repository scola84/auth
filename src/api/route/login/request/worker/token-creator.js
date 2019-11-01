import { randomBytes } from 'crypto'
import { AuthWorker } from '../../../../worker'

export class TokenCreator extends AuthWorker {
  act (box, data) {
    const confirm = box.user.hasAgent(box.request) === false
    const { remember } = data
    const setting = this.formatSetting(remember, confirm)

    box.user.setToken({
      duration: this.createDuration(box.user, setting),
      expires: this.createExpires(box.user, setting),
      scope: confirm === true
        ? '/api/l1/auth/login/confirm'
        : '/api/l1/',
      value: randomBytes(32).toString('hex'),
      confirm,
      remember
    })

    this.pass(box, data)
  }

  formatSetting (remember, confirm) {
    let setting = 'session'

    if (confirm === true) {
      setting = 'confirm'
    } else if (remember === 'on') {
      setting = 'remember'
    }

    return `auth.login.expires.l1.${setting}`
  }
}
