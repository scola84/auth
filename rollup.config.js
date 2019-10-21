const plugins = require('@scola/lib/rollup.plugins')

const external = [
  '@scola/lib',
  'argon2',
  'jsonwebtoken',
  'cryptr',
  'jwk-to-pem',
  'otplib'
]

const globals = {
  '@scola/lib': 'scola',
  argon2: 'argon2',
  jsonwebtoken: 'jsonwebtoken',
  cryptr: 'cryptr',
  otplib: 'otplib',
  'jwk-to-pem': 'jwkToPem'
}

const input = './index.js'

export default [{
  input,
  external,
  output: {
    file: 'dist/auth.umd.js',
    format: 'umd',
    globals,
    name: 'auth'
  },
  plugins: [
    ...plugins({
      format: 'umd'
    })
  ]
}, {
  input,
  external,
  output: {
    file: 'dist/auth.cjs.js',
    format: 'cjs',
    globals
  },
  plugins: [
    ...plugins({
      format: 'cjs'
    })
  ]
}]
