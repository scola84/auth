import { HtmlBuilder } from '@scola/lib'
import { fieldset } from '../../../../../cmn/route/register/request'

export class InputValidator extends HtmlBuilder {
  build (hb) {
    return hb.validate(
      fieldset(hb)
    ).err(
      hb.throw()
    )
  }
}
