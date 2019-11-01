import { SqlBuilder } from '@scola/lib'

export class TokenInserter extends SqlBuilder {
  setKey (value = 'token_id') {
    return super.setKey(value)
  }

  setType (value = 'insert') {
    return super.setType(value)
  }

  build (sb) {
    return sb.query(
      sb.insert(),
      sb.into(
        sb.id('user_token')
      ),
      sb.id(
        'user_id',
        'value',
        'scope',
        'expires'
      ).parens(),
      sb.values(
        sb.value((box) => {
          return box.user.getId()
        }),
        sb.value((box) => {
          return box.user.getToken().getValue()
        }),
        sb.value((box) => {
          return box.user.getToken().getScope()
        }),
        sb.value((box) => {
          return box.user.getToken().getExpires().toISOString()
        })
      )
    )
  }

  merge (box, data, query, [tokenId]) {
    box.user.getToken().setId(tokenId)
    return data
  }
}
