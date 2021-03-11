const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function(env) {
  return {
    context: __dirname,
    target: 'web',
    mode: env === 'production' ? 'production' : 'development',
    devtool: env === 'production' ? undefined : 'sourcemap',
    entry: {
      'index': './src/ts/index.tsx'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
        },
        {
          test: /\.png$/,
          loader: 'file-loader',
          options: {
              outputPath: 'images',
              name: '[name].[ext]',
          },
        },
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
              semantic: true,
              syntactic: true,
          },
          configOverwrite: {
              include: [
                './src/ts/**/*.ts',
                './src/ts/**/*.tsx'
              ]
          },
          mode: 'write-references',
        },
      }),
    ],
    watch: env !== 'production',
    optimization: {
      minimize: env === 'production',
    }
  }
};
