import webpackMerge = require('webpack-merge');
import commonConfg from './webpack.common';
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const webpackConfig = webpackMerge(commonConfg('production'), {
    mode: 'production',

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),

            new OptimizeCssAssetsPlugin(),
        ],

    },
});

export default webpackConfig;