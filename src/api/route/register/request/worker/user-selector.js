import { SqlBuilder } from '@scola/lib'

export class UserSelector extends SqlBuilder {
  build (sb) {
    return sb.query(
      sb.select(
        sb.id('user.email')
      ),
      sb.from(
        sb.id('user')
      ),
      sb.where(
        sb.eq(
          sb.id('email'),
          sb.value((box, data) => {
            return data.email
          })
        )
      )
    )
  }

  merge (box, data, query, [result = null]) {
    if (result !== null) {
      throw new Error('401 User exists')
    }

    return data
  }
}
