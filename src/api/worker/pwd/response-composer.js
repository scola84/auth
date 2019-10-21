import { Worker } from '@scola/lib'

export class PwdResponseComposer extends Worker {
  act (box, data) {
    this.pass(box, {
      data: {
        user: {
          otp: data.otp,
          remember: data.remember === 'on',
          user_id: data.user_id
        }
      }
    })
  }
}
