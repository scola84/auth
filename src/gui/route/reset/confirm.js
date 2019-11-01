import { HtmlBuilder } from '@scola/lib'
import { fieldset } from '../../../cmn/route/reset/confirm'

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
              .prefix(['auth.reset.confirm.status', 'status']),
            hb.submit(
              hb.form(
                fieldset(hb)
              )
            ).act(
              hb.validate(
                hb.selector('.body form')
              ).act(
                hb.request()
                  .resource((box, data) => {
                    return {
                      meta: {
                        headers: {
                          Authorization: `Bearer ${box.params.bearer}`
                        },
                        method: 'POST',
                        url: '/api/l1/auth/reset/confirm'
                      },
                      data
                    }
                  })
                  .call(false)
                  .act(
                    hb.route()
                      .view('auth-login-request@self:bwd&ltr', {
                        status: 'success.reset.confirm'
                      })
                  )
                  .err(
                    hb.route()
                      .view('auth-reset-request@self:bwd&ltr', {
                        status: 'failure.reset.confirm'
                      })
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
