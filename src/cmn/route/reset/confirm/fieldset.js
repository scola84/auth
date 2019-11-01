export function fieldset (hb) {
  return hb.fieldset(
    hb.group(
      hb.div().class('hidden').append(
        hb.email()
          .attributes({
            name: 'email',
            value: (box, data) => {
              return data.email
            }
          })
      ),
      hb.body(
        hb.item(
          hb.password()
            .attributes({
              autocomplete: 'new-password',
              name: 'password',
              required: 'required',
              placeholder: hb
                .print()
                .format('auth.reset.confirm.form.label.password.new')
            }),
          hb.hint()
        ),
        hb.item(
          hb.password()
            .attributes({
              autocomplete: 'new-password',
              name: 'repeat-password',
              required: 'required',
              placeholder: hb
                .print()
                .format('auth.reset.confirm.form.label.password.repeat')
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
