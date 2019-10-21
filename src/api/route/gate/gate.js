import { KeyStore } from '../../helper'
import { GateTokenVerifier } from '../../worker'

export function buildGate () {
  const tokenVerifier = new GateTokenVerifier({
    id: 'auth-login-gate-token-verifier',
    keyStore: new KeyStore()
  })

  return tokenVerifier
}
