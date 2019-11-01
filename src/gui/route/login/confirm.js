import { HtmlBuilder } from '@scola/lib'
import { fieldset } from '../../../cmn/route/login/confirm'

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
              .prefix(['auth.login.confirm.status', 'status']),
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
                          Authorization: `Bearer ${data.base}${data.code}`
                        },
                        method: 'POST',
                        url: '/api/l1/auth/login/confirm'
                      },
                      data: {
                        remember: data.remember
                      }
                    }
                  })
                  .call(false)
                  .act(
                    hb.call()
                      .name('auth-enter')
                  )
                  .err(
                    hb.route()
                      .view('auth-login-request@self:bwd&ltr', {
                        status: 'failure.login.confirm'
                      })
                  )
              ).err(
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
