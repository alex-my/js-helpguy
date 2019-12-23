import word from '../src';

beforeAll(() => {
    word.addWord('管理员');
    word.addWords(['电脑', '清华', '清华池', '清华大学']);
});

test('contains', () => {
    expect(word.contains('我喜欢去清华池')).toBe(true);
    expect(word.contains('我读了四年大学')).toBe(false);
    expect(word.contains('我不管理这个部门')).toBe(false);
});

test('words', () => {
    expect(word.words('我喜欢做网络管理员怎么了,我喜欢电脑')).toEqual(expect.objectContaining(['管理员', '电脑']));
});

test('replace', () => {
    expect(word.replace('我是管理员', '*', true)).toBe('我是*');
    expect(word.replace('我是管理员', '*', false)).toBe('我是***');
    expect(word.replace('我是管理员')).toBe('我是***');
});
