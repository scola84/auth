import { AuthWorker } from '../../../../worker'

export class ResponseComposer extends AuthWorker {
  act (box) {
    this.setCookie(box)

    this.pass(box, {
      data: {}
    })
  }
}
