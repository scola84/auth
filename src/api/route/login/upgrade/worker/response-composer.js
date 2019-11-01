import { Worker } from '@scola/lib'

export class ResponseComposer extends Worker {
  act (box) {
    this.pass(box, {
      data: {
        authorization: box.user.getToken().toBearer()
      }
    })
  }
}
