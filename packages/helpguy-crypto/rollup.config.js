import babel from 'rollup-plugin-babel';
import {
    terser
} from 'rollup-plugin-terser';

export default {
    input: './src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'index',
    },
    plugins: [
        babel({
            // 排除
            exclude: 'node_modules/**',
        }),
        terser()
    ]
}