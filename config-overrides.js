// module.exports =
//     function
//         override
//         (config) {
//             config.resolve.fallback = {
//                 ...config.resolve.fallback,
//                 zlib: false,
//                 querystring: false
//             };
//         return
//         config;
//     };
    module.exports = function override(config) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          zlib: require.resolve('browserify-zlib'), // Add zlib polyfill
        };
        return config;
      };