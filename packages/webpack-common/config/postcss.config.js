// const postcssNormalize = require('postcss-normalize')
const postcssPresetEnv = require('postcss-preset-env')

module.exports = () => ({
  ident: 'postcss',
  plugins: [
    postcssPresetEnv({
      stage: 0,
      features: {
        'nesting-rules': true,
      },
    }),
    require('autoprefixer'),
    // postcssNormalize({ forceImport: true }),
  ],
})
