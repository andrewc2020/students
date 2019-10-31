const path = require('path');

module.exports = {
    target: 'node',
    entry: {
        app: [
            
            './src/server.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'server.js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['@babel/preset-env']
            }
        }]
    }
};