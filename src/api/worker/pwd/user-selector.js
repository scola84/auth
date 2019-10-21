import { SqlBuilder } from '@scola/lib'

export class PwdUserSelector extends SqlBuilder {
  build (sb) {
    return sb.query(
      sb.select(
        'user_id',
        'pwd',
        'otp'
      ),
      sb.from(
        sb.id('user')
      ),
      sb.where(
        sb.eq(
          'username',
          sb.value((box, data) => data.username)
        )
      )
    )
  }

  merge (box, data, { result: [user = null] }) {
    if (user === null) {
      throw new Error('401 Unauthorized (User not found)')
    }

    return {
      ...data,
      ...user
    }
  }
}
