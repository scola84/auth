import { HtmlBuilder } from '@scola/lib'
import { fieldset } from '../../../cmn/route/reset/request'

export function request () {
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
              .prefix(['auth.reset.request.status', 'status']),
            hb.submit(
              hb.form(
                fieldset(hb)
              )
            ).act(
              hb.validate(
                hb.selector('.body form')
              ).act(
                hb.request()
                  .resource('POST /api/l0/auth/reset/request')
                  .act(
                    hb.selector('.body .message'),
                    hb.selector('.body .hint')
                  )
                  .err(
                    hb.selector('.body .message'),
                    hb.selector('.body .hint')
                  )
              ).err(
                hb.selector('.body .message'),
                hb.selector('.body .hint')
              )
            ),
            hb.div()
              .class('route')
              .append(
                hb.click(
                  hb.button()
                    .class('login')
                    .text(
                      hb.print()
                        .format('auth.login.request.route')
                    )
                ).act(
                  hb.route()
                    .view('auth-login-request@self:bwd&ltr', {})
                )
              )
          )
        )
    }
  })
}
