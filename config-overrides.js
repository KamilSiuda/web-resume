const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const webpack = require('webpack');
module.exports = function override (config, env) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        constants: require.resolve('constants-browserify'),
    	crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify'),
        url: require.resolve('url'),
        path: require.resolve('path'),
        fs: require.resolve('fs-extra'),
        zlib: require.resolve('browserify-zlib')
    });
    config.resolve.fallback = fallback;
    if (env !== 'production') {
        config.resolve.plugins = [new TsconfigPathsPlugin()];
        config.plugins = (config.plugins || []).concat([
            new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer']
            })
        ]);
        const newRules = config.module.rules.map((rule) => {
            if (rule.oneOf) {
                return {
                    ...rule,
                    oneOf: rule.oneOf.map(rule => rule.test?.toString().includes('ts|tsx')
                        ? ({
                            ...rule, include: undefined, exclude: /node_modules/
                        })
                        : rule)
                };
            }
            return rule;
        });
        config.module.rules = newRules;
    } else {
        config.resolve.plugins = (config.resolve.plugins || []).concat(new TsconfigPathsPlugin({ configFile: './tsconfig.build.json', logLevel: 'info' }));
    }

    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ]);
    console.log('!-------- WEBPACK config snapshot --------!');
    console.log(config);
    return config;
};
