const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './demo/index.ts'
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 8080,
        open: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index'],
            template: './demo/index.html'
        })
    ],
    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.html/,
                loader: "html-loader",
            },
            {
                // 引入图片
                test: /\.(png|jpeg|jpg|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: 'img/[hash][ext][query]'
                }
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'dist/'
    }
};