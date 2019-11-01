const plugins = require('@scola/lib/rollup.plugins')

const external = [
  '@scola/lib',
  'argon2',
  'crypto'
]

const globals = {
  '@scola/lib': 'scola',
  argon2: 'argon2',
  crypto: 'crypto'
}

export default [{
  input: './src/gui/index.js',
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
  input: './src/api/index.js',
  external,
  output: {
    file: 'dist/auth.cjs.js',
    format: 'cjs',
    globals,
    name: 'auth'
  },
  plugins: [
    ...plugins({
      format: 'cjs'
    })
  ]
}]
