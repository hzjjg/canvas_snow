import commonConfg from './webpack.common';
import resolve from './resolve';
import webpackMerge = require('webpack-merge');

const webpackConfig = webpackMerge(commonConfg('development'), {
    mode: 'development',

    devServer: {
        contentBase: resolve('dist'),
        compress: false,
        host: '127.0.0.1',
        port: 3000,
        hot: true,
        disableHostCheck: true,
        historyApiFallback: true,
    },
});

export default webpackConfig;