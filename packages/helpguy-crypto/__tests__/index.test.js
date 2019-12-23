import md5 from '../src';

test("md5('123456') to equal e10adc3949ba59abbe56e057f20f883e", () => {
    expect(md5('123456')).toBe('e10adc3949ba59abbe56e057f20f883e');
});
