import * as webpack from 'webpack';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import resolve from './resolve';

const commonConfg: (nodeEnv: NodeEnv) => webpack.Configuration = (nodeEnv: NodeEnv) => {
    return {

        entry: {
            demo: resolve('demo/index.ts'),
            snow: resolve('src/snow.ts'),
        },

        output: {
            path: resolve('dist'),
            filename: '[name].[hash].js',
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: 'fonts/[name].[ext]',
                    },
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        {
                            loader: nodeEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader as string,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'sass-loader?sourceMap',
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'url-loader',
                    query: {
                        limit: 1,
                        name: 'images/[hash:8].[name].[ext]',
                    },
                },
            ],

        },

        resolve: {
            extensions: ['.ts', '.js', '.scss', 'json'],
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: resolve('/demo/index.html'),
                chunks: ['demo'],
            }),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(nodeEnv),
            }),

            new CleanWebpackPlugin('dist', {
                root: resolve('/'),
            }),
        ],
    };
};

type NodeEnv = 'development' | 'production';

export default commonConfg;