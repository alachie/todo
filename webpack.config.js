var debug        = process.env.NODE_ENV !== 'production';
var webpack      = require('webpack');
var autoprefixer  = require('autoprefixer');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.css', '.scss']
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {
            minimize: debug ? false : true
          }},
          {loader: 'postcss-loader', options: {plugins: () => [autoprefixer]}},
          {loader: 'sass-loader', options: {indentedSyntax: true, precision: 2}},
        ]
      }
    ]
  },
  plugins: debug ? [] : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: true
    })
  ]
};
