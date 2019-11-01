import { AuthWorker } from '../../../../worker'

export class ResponseComposer extends AuthWorker {
  act (box) {
    const token = box.user.getToken()

    if (token.getConfirm() === true) {
      this.passConfirm(box, token)
      return
    }

    this.passRequest(box, token)
  }

  passConfirm (box, token) {
    this.pass(box, {
      data: {
        base: token.sliceBase(),
        remember: token.getRemember(),
        status: 'success'
      }
    })
  }

  passRequest (box, token) {
    this.setCookie(box, token)

    this.pass(box, {
      data: {
        remember: token.getRemember(),
        user: box.user.toObject()
      }
    })
  }
}
