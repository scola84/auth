import {
  HtmlBuilder,
  MsgSender
} from '@scola/lib'

export class TokenSender extends MsgSender {
  decide (box) {
    return box.user.getToken().getConfirm() === true
  }

  message (box) {
    const code = box.user.getToken().sliceCode()
    const email = box.user.getEmail()
    const locale = box.user.getSetting('locale')
    const name = box.user.getName()
    const to = box.user.getEmailName()
    const token = box.user.getToken().toObject()

    const base =
      box.user.getRole().getSetting('auth.login.request.msg') ||
      HtmlBuilder.snippet.misc.Print.findString('auth.login.request.msg', locale)

    const data = {
      code,
      name,
      email,
      token
    }

    const message = {
      ...base,
      data,
      locale,
      to
    }

    return message
  }
}
