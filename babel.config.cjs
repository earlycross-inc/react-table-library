module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@emotion/babel-preset-css-prop'],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
    [
      'module-resolver',
      {
        alias: {
          '@earlycross-inc/react-table-library/types': './src/types',
          '@earlycross-inc/react-table-library/common': './src/common',
          '@earlycross-inc/react-table-library/table': './src/table',
          '@earlycross-inc/react-table-library/compact': './src/compact',
          '@earlycross-inc/react-table-library/virtualized': './src/virtualized',
          // features
          '@earlycross-inc/react-table-library/theme': './src/theme',
          '@earlycross-inc/react-table-library/resize': './src/resize',
          '@earlycross-inc/react-table-library/sort': './src/sort',
          '@earlycross-inc/react-table-library/select': './src/select',
          '@earlycross-inc/react-table-library/tree': './src/tree',
          '@earlycross-inc/react-table-library/pagination': './src/pagination',
          // themes
          '@earlycross-inc/react-table-library/baseline': './src/baseline',
          '@earlycross-inc/react-table-library/mantine': './src/mantine',
          '@earlycross-inc/react-table-library/chakra-ui': './src/chakra-ui',
          '@earlycross-inc/react-table-library/material-ui': './src/material-ui',
        },
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
};
