// craco.config.ts
const cracoConfig = {
  webpack: {
    configure: (webpackConfig: any) => {
      // Ensure that fallback for querystring is a valid string (module path)
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        querystring: require.resolve('querystring-es3'), // Ensure this is a valid string path
      };

      return webpackConfig;
    },
  },
};

export default cracoConfig; // Export as ES Module
