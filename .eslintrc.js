module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: ['airbnb-base', 'prettier', 'prettier/standard'],
    plugins: ['prettier', 'standard'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    // https://cn.eslint.org/docs/rules/
    rules: {
        'prettier/prettier': 'error',
        'class-methods-use-this': 'off'
    }
};
