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
              autocomplete: 'new-password',
              name: 'password',
              required: 'required',
              placeholder: hb
                .print()
                .format('auth.login.request.form.label.password')
            }),
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
