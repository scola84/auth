import { HtmlBuilder } from '@scola/lib'

export function confirm () {
  return new HtmlBuilder({
    view (hb) {
      return hb
        .panel()
        .class('auth')
        .append(
          hb.body(
            hb.div()
              .class('identity'),
            hb.message()
              .default('default')
              .prefix(['auth.register.confirm.status', 'status'])
          )
        )
    }
  })
}
