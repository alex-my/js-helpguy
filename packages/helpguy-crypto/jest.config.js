module.exports = {
    // 收集测试覆盖率信息
    collectCoverage: true,
    // 配置测试最低阈值
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};
