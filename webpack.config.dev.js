const path = require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const DotEnv=require("dotenv-webpack")

module.exports = {
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"main.js",
        clean:true,
    },
    mode:"development",
    watch:true,
    resolve:{
        extensions:[".js"],
        alias:{
            "@utils":path.resolve(__dirname,"src/utils/"),
            "@templates":path.resolve(__dirname,"src/templates/"),
            "@styles":path.resolve(__dirname,"src/styles/"),
            "@images":path.resolve(__dirname,"src/assets/images/")
        }
    },
    module:{
        rules:[
            {
                test:/\.m?js$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader"
                }
            },
            {                
                test:/\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test:/\.png/,
                type:"asset/resource",
                generator: {
                    filename : 'assets/images/[name][ext][query]',
                }
            },
            {
                test:/\.(woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename : 'assets/fonts/[name][ext][query]',
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject:"body",
            template:"./public/index.html",
            filename:"./index.html"
        }),
        new MiniCssExtractPlugin({
            filename:"styles/[name].css",
        }),
        new DotEnv(),
    ],
}
