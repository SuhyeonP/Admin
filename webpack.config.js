// 참고 문서 :
// https://velog.io/@jjunyjjuny/React-TS-boilerplate-%EC%A0%9C%EC%9E%91%EA%B8%B0-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%84%B1
//
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const PORT = process.env.PORT || 3000;
// const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = (env, argv) => ({
  mode: argv.mode,
  devtool: argv.mode === 'production' ? undefined : 'eval-source-map',
  entry: './src/index.tsx',
  stats: 'minimal',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '~': path.resolve(__dirname),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      // tsconfig.json - 'jsx' 를 'preserve' 로 사용해야한다면 위 ts-loader 대신 아래 설정 사용할 것
      // (babel-loader install 필요)
      //
      // {
      //     test: /\.(ts|js)x?$/,
      //     exclude: /node_modules/,
      //     use: [
      //         "babel-loader",
      //         {
      //             loader: 'ts-loader',
      //             options: {
      //                 transpileOnly: true,
      //             },
      //         },
      //     ],
      // },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(webp|jpg|png|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      hash: true,
    }),
    new ESLintPlugin({
      extensions: ['.ts', '.tsx'],
      failOnError: true,
    }),
    new StylelintPlugin({
      exclude: ['node_modules'],
      extensions: ['css', 'scss', 'ts', 'tsx'],
      emitError: true,
    }),
  ].filter(Boolean),
  devServer: {
    // contentBase: path.resolve(__dirname, 'public'),
    host: '0.0.0.0',
    port: PORT,
    open: false,
    hot: true,
    compress: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
});
