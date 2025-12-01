const { mode } = require("../microfrontendreactapp/webpack.config");

module.exports = {
    mode : 'development',
    devServer: {
        port: 3002,
    },  
    plugins : new ModuleFederationPlugin({
        name : 'basicreactapp',
        filename: 'remoteEntry.js',
        remotes :
        {
            microfrontendreactapp : 'microfrontendreactapp@http://localhost:3001/remoteEntry.js',   
        },
        shared : {
            react : {   singleton : true,   },
            "react-dom" : { singleton : true, },
        }
    }),

}