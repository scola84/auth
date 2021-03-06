import {
  HtmlBuilder,
  MsgSender
} from '@scola/lib'

export class TokenSender extends MsgSender {
  message (box) {
    const bearer = box.user.getToken().toBearer()
    const email = box.user.getEmail()
    const locale = box.user.getSetting('locale')
    const link = `#/auth-reset-confirm:bearer=${bearer}@pop`
    const name = box.user.getName()
    const to = box.user.getEmailName()
    const token = box.user.getToken().toObject()

    const base =
      box.user.getRole().getSetting('auth.reset.msg') ||
      HtmlBuilder.snippet.misc.Print.findString('auth.reset.msg', locale)

    const data = {
      bearer,
      name,
      email,
      link,
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
