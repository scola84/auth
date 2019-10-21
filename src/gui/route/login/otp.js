import { HtmlBuilder } from '@scola/lib'

export function buildOtp () {
  const builder = new HtmlBuilder({
    view (hb) {
      return hb.panel(
        hb.body(
          hb.div().class('identity'),
          hb.submit(
            hb.form(
              hb.fieldset(
                hb.group(
                  hb.body(
                    hb.item(
                      hb.password()
                        .attributes({
                          name: 'token',
                          required: 'required',
                          placeholder: hb
                            .print()
                            .format('auth.login.otp.form.label.token')
                        }),
                      hb.hint()
                    )
                  )
                )
              )
            )
          ).act(
            hb.validate(
              hb.selector('.body form')
            ).act(
              hb.request()
                .resource('POST /api/auth/login/otp')
                .act(
                  hb.route().view('@self:ltr')
                )
                .err(
                  hb.selector('.body .hint')
                )
            ).err(
              hb.selector('.body .hint')
            )
          )
        )
      )
    }
  })

  return builder
}
