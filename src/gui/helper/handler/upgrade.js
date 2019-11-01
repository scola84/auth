import { HtmlBuilder } from '@scola/lib'

export class UpgradeHandler {
  handle (box, data, callback) {
    const hb = new HtmlBuilder()

    const prompt = hb
      .prompt()
      .title(
        hb.print()
          .format('auth.login.upgrade.prompt.title')
      )
      .message(
        hb.print()
          .format('auth.login.upgrade.prompt.message')
      )
      .input(
        hb.div()
          .class('auth')
          .append(
            hb.email()
              .attributes({
                name: 'email',
                tabindex: -1,
                value: box.user.getEmail()
              }),
            hb.password()
              .class('prompt')
              .attributes({
                name: 'password'
              })
          )
      )
      .act(() => {
        const password = box.prompt
        delete box.prompt

        return hb
          .request()
          .resource({
            meta: {
              method: 'POST',
              url: '/api/l1/auth/login/upgrade'
            },
            data: {
              password
            }
          })
          .act((bx, d) => {
            box.authorization = d.authorization
            callback(null)
          })
          .err((bx, error) => {
            callback(error)
          })
      })

    prompt.resolve(box, data)

    prompt
      .node()
      .select('input.prompt')
      .node()
      .focus()
  }
}
