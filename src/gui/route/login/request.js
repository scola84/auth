import { HtmlBuilder } from '@scola/lib'
import { fieldset } from '../../../cmn/route/login/request'

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
              .prefix(['auth.login.request.status', 'status']),
            hb.submit(
              hb.form(
                fieldset(hb)
              )
            ).act(
              hb.validate(
                hb.selector('.body form')
              ).act(
                hb.request()
                  .resource('POST /api/l0/auth/login/request')
                  .act((box, data) => {
                    if (data.user === undefined) {
                      return hb
                        .route()
                        .view('auth-login-confirm@self:rtl')
                    }

                    return hb
                      .call()
                      .name('auth-enter')
                  })
                  .call(false)
                  .err((box, error) => {
                    error.status = error.code

                    return [
                      hb.selector('.body .message'),
                      hb.selector('.body .hint')
                    ]
                  })
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
                    .class('reset')
                    .text(
                      hb.print()
                        .format('auth.reset.request.route')
                    )
                ).act(
                  hb.route()
                    .view('auth-reset-request@self:rtl', () => {
                      return {
                        email: HtmlBuilder
                          .querySelector('input[name=email]')
                          .property('value')
                      }
                    })
                ),
                hb.span()
                  .class('separator'),
                hb.click(
                  hb.button()
                    .class('register')
                    .text(
                      hb.print()
                        .format('auth.register.request.route')
                    )
                ).act(
                  hb.route()
                    .view('auth-register-request@self:rtl')
                )
              )
          )
        )
    }
  })
}
