const webpack = require('webpack')

module.exports = {
  performance: {
    perfetch: false
  },
  server: {
    // 本地
    port: 2008,
    //正式环境
    // port: 3000,
    host: 'localhost'
  },
  // mode: 'spa',
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, '2_a-amall.com.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, '1_a-amall.com_bundle.crt'))
  //   }
  // },

  /*
   ** Headers of the page
   */
  head: {
    title: '环球云仓',
    script: [{
      src: 'https://hm.baidu.com/hm.js?914e7051f6482a59799e9918069497a7'
    }, /*引入百度统计的js*/ ],
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: '环球云仓，致力于为国内商户提供澳洲、新西兰等海外优质货源，坚持原厂采购的一手货源，坐落于成都保税仓，为全国商家，提供跨境电商供应链服务及合规解决方案！100%正品保证，取得Healthy Care、佳思敏、QV等品牌的官方授权！'
      },
      {
        hid: 'baidu',
        name: 'baidu-site-verification',
        content: 'cWYlieDkxe'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '环球云仓,跨境货源,跨境电商,跨境电商平台,澳洲供货商,澳洲奶粉,有赞微商城,海外批发,跨境直邮,澳新货源,海外货源,海外商品,跨境进口,进口货源,海外直邮,进口分销,海外供应链,澳洲货源,跨境批发'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: 'favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: "@/plugins/vue-swiper.js",
      ssr: false
    },
    '@/plugins/element-ui',
    '@/plugins/baiduGa.js',
    '@/plugins/filter.js',
    '@/plugins/route',
    {
      src: '@/plugins/vue_cookie.js',
      ssr: false
    },
    {
      src: '@/plugins/vue_lazy.js',
      ssr: true
    },
    {
      src: '@/plugins/vue_request.js',
      ssr: false
    }
  ],
  css: [{
      src: "swiper/dist/css/swiper.css"
    },
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/font-awesome.min.css',
    '~/assets/css/animate.min.css',
    '~/assets/css/index.less',
    "~/assets/css/main.css",
    '~/assets/css/color-dark.css'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    vendor: ['core-js', 'axios'],
    loaders: [{
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1KB
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1 KB
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ],
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        jQuery: 'jquery'
      })
    ],
    extend(config, ctx) {

    }
  }
}
