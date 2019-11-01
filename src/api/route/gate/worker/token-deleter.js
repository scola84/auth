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
          sb.id('token_id'),
          sb.value((box) => {
            return box.user.getToken().getId()
          })
        )
      )
    )
  }

  decide (box, data) {
    return data instanceof Error
  }

  err (box, error) {
    if (error.message.match(/\[auth-logout\]/) !== null) {
      this.handle(box, error)
      return
    }

    this.fail(box, error)
  }
}
