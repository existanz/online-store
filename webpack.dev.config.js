const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
    static: {
      directory: path.resolve(__dirname, './src'),
      watch: true
    }
  },
};
