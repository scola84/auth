export function fieldset (hb) {
  return hb.fieldset(
    hb.group(
      hb.div().class('hidden').append(
        hb.text()
          .attributes({
            name: 'base',
            value: (box, data) => {
              return data.base
            }
          }),
        hb.checkbox()
          .attributes({
            name: 'remember'
          })
          .properties({
            checked: (box, data) => {
              return data.remember === 'on'
            }
          })
      ),
      hb.body(
        hb.item(
          hb.text()
            .attributes({
              autocomplete: 'off',
              name: 'code',
              required: 'required',
              placeholder: hb
                .print()
                .format('auth.login.confirm.form.label.code')
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
