/**
 * @desc styleguide配置文件
 * @author hm20160509
 * @date 2018/2/8
 */

const path = require('path')
const utils = require('./build/utils')
// const baseWebpackConfig = require('./build/webpack.base.conf')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  components: 'src/views/haomo/components/**/[A-Z]*.vue',
  ignore: [
    '**/index.vue'
  ],
  defaultExample: true,
  webpackConfig: Object.assign({
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader?cacheDirectory',
          include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
          include: [resolve('src/icons')],
          options: {
            symbolId: 'icon-[name]'
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          exclude: [resolve('src/icons')],
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      ]
    }
  }),
  showUsage: true,
  showCode: true
}
