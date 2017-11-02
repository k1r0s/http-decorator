import babel from 'rollup-plugin-babel';

export default {
  input: `index.js`,
  output: [
		{ file: 'httpDecorator.js', format: 'umd' },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      "presets": [
        [
          "env",
          {
            "modules": false
          }
        ]
      ],
      "plugins": [
        "external-helpers"
      ]
    })
  ]
}
