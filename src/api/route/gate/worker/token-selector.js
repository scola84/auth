import { SqlBuilder } from '@scola/lib'
import { User } from '../../../../cmn/helper'

export class TokenSelector extends SqlBuilder {
  build (sb) {
    return sb.query(
      sb.select(
        sb.id(
          'role.*',
          'user.*',
          'user_token.*'
        ),
        sb.as(
          sb.jsonExtract(
            sb.id('user.meta'),
            sb.path('date_created[0]')
          ),
          'date_created'
        ),
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
        sb.id('user_token')
      ),
      sb.left(),
      sb.join(
        sb.id('user')
      ),
      sb.on(
        sb.eq(
          sb.id('user.user_id'),
          sb.id('user_token.user_id')
        )
      ),
      sb.left(),
      sb.join(
        sb.id('user_role')
      ),
      sb.on(
        sb.eq(
          sb.id('user_role.user_id'),
          sb.id('user_token.user_id')
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
        sb.and(
          sb.eq(
            sb.id('user_token.token_id'),
            sb.value((box, data) => {
              return box.token.id
            })
          )
        )
      )
    )
  }

  decide (box) {
    if (box.request.url.pathname.match(/^\/api\/l0\//) !== null) {
      return false
    }

    let authorization = box.request.getHeader('authorization')

    if (authorization === undefined || authorization === '') {
      authorization = box.request.parseHeader('cookie').Authorization
    }

    if (authorization === undefined || authorization === '') {
      throw new Error('401 [auth-request] Bearer not found')
    }

    authorization = authorization.match(/(?<id>\d+)-(?<value>[a-z0-9]+)/)

    if (authorization === null) {
      throw new Error('401 [auth-request] Bearer is invalid')
    }

    box.token = authorization.groups

    return true
  }

  merge (box, data, query, [result = null]) {
    if (result === null) {
      throw new Error('401 [auth-request] Token not found')
    }

    box.user = new User({
      agents: result.agents,
      email: result.email,
      id: result.user_id,
      meta: result.meta,
      name: result.name,
      password: result.password,
      role: {
        id: result.role_id,
        permissions: result.permissions,
        settings: result.role_settings
      },
      settings: result.user_settings,
      tel: result.tel,
      token: {
        expires: new Date(result.expires),
        id: result.token_id,
        scope: result.scope,
        value: result.value
      }
    })

    return data
  }
}
