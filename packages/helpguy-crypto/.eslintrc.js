module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: ["airbnb-base", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    // https://cn.eslint.org/docs/rules/
    rules: {}
};
