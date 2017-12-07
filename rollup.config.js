import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';

export default {
  input: `index.js`,
  output: [
		{ file: 'httpDecorator.umd.js', name: 'httpDecorator', format: 'umd' },
  ],
  plugins: [
    commonjs(),
    buble()
  ]
}
