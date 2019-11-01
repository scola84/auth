import { SqlBuilder } from '@scola/lib'
import { User } from '../../../../../cmn/helper'

export class UserSelector extends SqlBuilder {
  build (sb) {
    return sb.query(
      sb.select(
        sb.id('role.*'),
        sb.id('user.*'),
        sb.as(
          sb.id('role.settings'),
          'role_settings'
        ),
        sb.as(
          sb.id('user.settings'),
          'user_settings'
        )
      ),
      sb.from(
        sb.id('user')
      ),
      sb.left(),
      sb.join(
        sb.id('user_role')
      ),
      sb.on(
        sb.eq(
          sb.id('user_role.user_id'),
          sb.id('user.user_id')
        )
      ),
      sb.left(),
      sb.join(
        sb.id('role')
      ),
      sb.on(
        sb.eq(
          sb.id('role.role_id'),
          sb.id('user_role.role_id')
        )
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
    if (result === null) {
      throw new Error('401 User not found')
    }

    box.user = new User({
      agents: result.agents,
      email: result.email,
      id: result.user_id,
      meta: result.meta,
      name: result.name,
      password: result.password,
      settings: result.user_settings,
      tel: result.tel
    })

    box.user.setRole({
      id: result.role_id,
      permissions: result.permissions,
      settings: result.role_settings
    })

    return data
  }
}
