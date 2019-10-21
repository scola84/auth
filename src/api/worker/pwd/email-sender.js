import { MsgSender } from '@scola/lib'

export class PwdEmailSender extends MsgSender {
  decide (box, data) {
    return data.method === 'email'
  }

  expect () {
    return [null, {
      token: 'string',
      username: 'string'
    }]
  }

  filter (box, data) {
    return {
      from: 'koen@genericmedia.nl',
      subject: 'OTP',
      text: data.token,
      to: data.username
    }
  }
}
