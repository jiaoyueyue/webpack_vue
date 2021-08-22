

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    // 入口起点: 指示webpack应该使用那个模块, 来作为构建其内部依赖图的开始. 进入入口起点后
    // webpack会找出那些模块和库是入口起点(直接和间接)依赖的
    // 可以通过在webpack配置中配置entry属性, 来指定一个入口起点(或多个入口起点).默认值为./src
    entry: './src/main',
    // entry: {
    //     app: './src/main.js'
    // },
    // output属性告诉webpack在哪里输出它所创建的bundles, 以及如何命名这些文件, 默认值为./dist
    // 源代码是用于书写和编辑的代码. 
    // 分发代码是构建过程产生的代码最小化和优化后的“输出”目录, 最终将在浏览器中加载
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: './'
    },
    resolve: {
        extensions: [".js", ".vue", ".scss", ".css"], //后缀名自动补全,当导入文件的时候可以省略后缀名不写
        alias: {
        //   'vue$': 'vue/dist/vue.esm.js',//精确匹配,当import Vue from 'vue'的时候引入的是vue.esm.js这个版本库而不是其他版本
          "@": path.resolve(__dirname, "./src") //用@代替./src路径  所以就可以 import xx from ' @/xx'
        }
      },
    /**
     * 当webpack打包源代码时, 可能很难追踪到错误和在源代码中的原始位置.例如, 如果三个源文件(a.js、b.js、c.js)打包到一个bundle中
     * 而其中一个源文件包含一个错误, 那么堆栈跟踪就会简单的指向bundle.js. 这通常并没有太大帮助
     * 为了更容易地追踪错误和警告, JavaScript提供了sourcemap功能, 将编译后的代码映射回原始代码.
     */
    devtool: 'inline-source-map',
    devServer: {
        // webpack-dev-server提供了一个简单的web容器, 并且能够实时重新加载
        // contentBase: './dist', // 加载文件的路径
        /**
         * 模块热更替换(Hot Module Replacement或HMR)允许在运行时更新各种模块, 而无需进行完全刷新
         */
        hot: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 通过使用WebpackManifestPlugin, 可以直接将数据提取到一个json文件, 以供使用
            title: 'Output management'
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        // new webpack.NamedModulesPlugin(), // 以便更容易查看要修补(patch)的依赖
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        // new OptimizeCssAssetsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ],
    module: {
        rules: [
            // loader用于对模块的源代码进行转换.
            // loader可以使你在import或加载模块时预处理文件, 因此loader类似于其他构建工具中“任务”(taxk), 并提供了处理前端构建步骤的强大方法
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                    'style-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'css-loader',
                    'style-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    },
};