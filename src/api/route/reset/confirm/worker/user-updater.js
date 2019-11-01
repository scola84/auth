import { SqlBuilder } from '@scola/lib'

export class UserUpdater extends SqlBuilder {
  build (sb) {
    return sb.query(
      sb.update(
        sb.id('user')
      ),
      sb.set(
        sb.eq(
          sb.id('password'),
          sb.value((box, data) => {
            return data.password
          })
        )
      ),
      sb.where(
        sb.eq(
          sb.id('user_id'),
          sb.value((box) => {
            return box.user.getId()
          })
        )
      )
    )
  }
}
