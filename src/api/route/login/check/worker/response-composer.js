import { AuthWorker } from '../../../../worker'

export class ResponseComposer extends AuthWorker {
  act (box) {
    this.pass(box, {
      data: {
        user: box.user.toObject()
      }
    })
  }
}
