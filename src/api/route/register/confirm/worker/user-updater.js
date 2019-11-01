import { SqlBuilder } from '@scola/lib'

export class UserUpdater extends SqlBuilder {
  build (sb) {
    return sb.query(
      sb.update(
        sb.id('user')
      ),
      sb.set(
        sb.eq(
          sb.id('meta'),
          sb.value((box) => {
            return box.user.getMeta()
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

  filter (box, data) {
    box.user.setMeta({
      state_confirmed: true
    })

    return data
  }
}
