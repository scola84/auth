export function fieldset (hb) {
  return hb.fieldset(
    hb.group(
      hb.body(
        hb.item(
          hb.email()
            .attributes({
              name: 'email',
              required: 'required',
              placeholder: hb
                .print()
                .format('auth.login.request.form.label.email')
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
                .format('auth.login.request.form.label.password')
            }),
          hb.hint()
        ),
        hb.item(
          hb.checkbox().wrap()
            .attributes({
              id: 'remember',
              name: 'remember'
            }),
          hb.label()
            .class('click')
            .name('label')
            .attributes({
              for: 'remember'
            })
            .append(
              hb.div().class('l1').text(
                hb.print().format('auth.login.request.form.label.remember')
              )
            ),
          hb.button()
            .class('icon invert ion-ios-arrow-round-forward')
            .attributes({
              type: 'submit'
            }),
          hb.hint()
        )
      )
    )
  )
}
