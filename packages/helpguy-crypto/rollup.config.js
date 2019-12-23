import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import notify from 'rollup-plugin-notify';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import analyzer from 'rollup-plugin-analyzer';

export default {
    input: './src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'index'
    },
    plugins: [
        progress({
            clearLine: true
        }),
        resolve({
            mainFields: ['jsnext', 'main', 'browser']
        }),
        commonjs({
            sourceMap: false
        }),
        babel({
            // 排除
            exclude: 'node_modules/**'
        }),
        terser(),
        notify(),
        visualizer({
            open: false
        }),
        analyzer({
            summaryOnly: true
        })
    ]
};
