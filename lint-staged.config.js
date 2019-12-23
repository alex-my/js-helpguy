module.exports = {
    '*': 'lerna exec npm run test',
    '*.js': ['eslint --fix --color', 'prettier --write', 'git add']
};
