import { HtmlBuilder } from '@scola/lib'

function renderFieldset (hb) {
  return hb.fieldset(
    hb.group(
      hb.body(
        hb.item(
          hb.text()
            .attributes({
              name: 'username',
              required: 'required',
              placeholder: hb
                .print()
                .format('auth.login.pwd.form.label.username')
            }),
          hb.hint()
        ),
        hb.item(
          hb.password()
            .attributes({
              name: 'password',
              required: 'required',
              placeholder: hb
                .print()
                .format('auth.login.pwd.form.label.password')
            }),
          hb.hint()
        ),
        hb.item().name('label').class('click').append(
          hb.checkbox().wrap()
            .attributes({
              name: 'remember'
            }),
          hb.label(
            hb.div().class('l1').text(
              hb.print().format('auth.login.pwd.form.label.remember')
            )
          ),
          hb.hint()
        ),
        hb.item(
          hb.button()
            .attributes({
              type: 'submit'
            })
            .text(
              hb.print().format('auth.login.pwd.form.label.login')
            )
        )
      )
    )
  )
}

export function buildPwd () {
  const builder = new HtmlBuilder({
    view (hb) {
      return hb.panel(
        hb.body(
          hb.div().class('identity'),
          hb.submit(
            hb.form(
              renderFieldset(hb)
            )
          ).act(
            hb.validate(
              hb.selector('.body form')
            ).act(
              hb.request()
                .resource('POST /api/auth/login/pwd')
                .act(
                  hb.call().name('authLogin')
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
