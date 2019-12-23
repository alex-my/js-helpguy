module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                // "modules": false,
                targets: {
                    node: 'current'
                }
            }
        ]
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true
            }
        ]
    ]
};
