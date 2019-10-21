import { SqlBuilder } from '@scola/lib'

export class OtpUserSelector extends SqlBuilder {
  build (sb) {
    return sb.query(
      sb.select(
        'user_id',
        'otp'
      ),
      sb.from(
        sb.id('user')
      ),
      sb.where(
        sb.eq(
          'user_id',
          sb.value((box, data) => box.user.user_id)
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
