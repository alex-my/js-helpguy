module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: ['airbnb-base'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    // https://cn.eslint.org/docs/rules/
    rules: {
        'class-methods-use-this': 'off'
    }
};
