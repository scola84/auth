import { SqlBuilder } from '@scola/lib'

export class TokenDeleter extends SqlBuilder {
  build (sb) {
    return sb.query(
      sb.delete(),
      sb.from(
        sb.id('user_token')
      ),
      sb.where(
        sb.eq(
          sb.id('value'),
          sb.value((box) => {
            return box.user.getToken().getValue()
          })
        )
      )
    )
  }
}
