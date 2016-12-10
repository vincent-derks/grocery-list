const prod = process.argv.indexOf('-p') !== -1;

if(prod){

    var webpack = require('webpack');

    module.exports = {
        entry: './src/index.js',
        output: {
            path: './web/',
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        babelrc: false,
                        presets: [
                            'es2015',
                            'stage-0',
                            'react'
                        ],
                        plugins: [
                            'transform-decorators-legacy',
                            'transform-object-rest-spread'
                        ]
                    }
                }
            ],

        },
        plugins: [
            new webpack.DefinePlugin({
              'process.env':{
                'NODE_ENV': JSON.stringify('production')
              }
            }),
            new webpack.optimize.UglifyJsPlugin({
              compress:{
                warnings: true
              }
            }),
        ]
    }

} else {

    module.exports = {
        entry: './src/index.js',
        output: {
            path: './web/',
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        babelrc: false,
                        presets: [
                            'es2015',
                            'stage-0',
                            'react'
                        ],
                        plugins: [
                            'transform-decorators-legacy',
                            'transform-object-rest-spread'
                        ]
                    }
                }
            ],

        }
    }

}
