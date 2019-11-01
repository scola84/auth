import { AuthWorker } from '../../../../worker'

export class ResponseComposer extends AuthWorker {
  act (box) {
    const token = box.user.getToken()

    this.setCookie(box, token)

    this.pass(box, {
      data: {
        remember: token.getRemember(),
        user: box.user.toObject()
      }
    })
  }
}
