import { SqlBuilder } from '@scola/lib'
import { User } from '../../../../../cmn/helper'

export class UserInserter extends SqlBuilder {
  setKey (value = 'user_id') {
    return super.setKey(value)
  }

  setType (value = 'insert') {
    return super.setType(value)
  }

  build (sb) {
    return sb.query(
      sb.insert(),
      sb.into(
        sb.id('user')
      ),
      sb.id(
        'email',
        'password',
        'meta'
      ).parens(),
      sb.values(
        sb.value((box) => {
          return box.user.getEmail()
        }),
        sb.value((box) => {
          return box.user.getPassword()
        }),
        sb.value((box) => {
          return box.user.getMeta()
        })
      )
    )
  }

  filter (box, data) {
    box.user = new User({
      email: data.email,
      meta: {
        date_created: new Date()
      },
      password: data.password
    })

    return data
  }

  merge (box, data, query, [userId]) {
    box.user.setId(userId)
    return data
  }
}
