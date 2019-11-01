export function fieldset (hb) {
  return hb.fieldset(
    hb.group(
      hb.body(
        hb.item(
          hb.email()
            .attributes({
              name: 'email',
              required: 'required',
              value: (box, data) => {
                return data.email
              },
              placeholder: hb
                .print()
                .format('auth.reset.request.form.label.email')
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
