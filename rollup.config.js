import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import commonjs from 'rollup-plugin-commonjs';

export default [
  {
    input: 'bin/index.js',
    output: {
      file: 'dist/bundle.umd.min.js',
      format: 'umd',
      name: 'contrax'
    },
    plugins: [
      nodeResolve(),
      preserveShebangs(),
      commonjs({
        transformMixedEsModules: true,
        include: ['src/**', 'node_modules/**']
      }),
      json(),
      babel(),
      terser()
    ],
  },
];
