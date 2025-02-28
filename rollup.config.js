import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

// https://stackoverflow.com/a/65978156/1189762
// see package.json "type": "module"
// https://stackoverflow.com/a/63216984/1189762
// see babel.config.cjs instead of .js
// https://github.com/storybookjs/storybook/issues/11587#issuecomment-898604266
// see .storybook/package.json
const babelConfig = require('./babel.config.cjs');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: {
    main: './src/index.ts',
    types: './src/types/index.ts',
    common: './src/common/index.ts',
    table: './src/table/index.ts',
    compact: './src/compact/index.ts',
    virtualized: './src/virtualized/index.ts',
    // features
    theme: './src/theme/index.ts',
    sort: './src/sort/index.ts',
    select: './src/select/index.ts',
    tree: './src/tree/index.ts',
    pagination: './src/pagination/index.ts',
    // themes
    baseline: './src/baseline/index.ts',
    mantine: './src/mantine/index.ts',
    ['chakra-ui']: './src/chakra-ui/index.ts',
    ['material-ui']: './src/material-ui/index.ts',
  },
  output: [
    // ES module version, for modern browsers
    {
      name: '@earlycross-inc/react-table-library',
      dir: `${__dirname}/lib`,
      format: 'es',
      sourcemap: true,
      entryFileNames: '[name].js',
      // preserveModules: true,
    },
    // SystemJS version, for older browsers
    // {
    //   dir: `${__dirname}/lib/nomodule`,
    //   format: 'system',
    //   sourcemap: true,
    // },
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    del({ targets: 'lib/*' }),
    peerDepsExternal(),
    postcss({
      modules: true,
    }),
    resolve({ extensions, preferBuiltins: false }),
    typescript({
      typescript: require('typescript'),
      clean: true,
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions,
      ...babelConfig,
    }),
    commonjs({
      sourceMap: true,
      exclude: 'src/**',
    }),
    terser({
      module: true,
    }),
  ],
};
