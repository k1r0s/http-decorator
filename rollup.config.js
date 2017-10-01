import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json';
const pkg = require('./package.json')

const libraryName = 'dec-http'

export default {
  input: `compiled/src/${libraryName}.js`,
  output: [
		{ file: pkg.main, moduleName: 'decHttp', format: 'umd' },
		{ file: pkg.module, format: 'es' }
  ],
  sourcemap: true,
  external: [],
  plugins: [
    commonjs({
      include: 'node_modules/**'
    }),
    json()
  ]
}
