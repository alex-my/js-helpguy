import SensitiveWords from './sensitive-words';

/**
 * word.addWord
 * @example
 *
 * // 添加屏蔽字
 * word.addWord('管理员');
 * word.addWords(['电脑', '清华', '清华池', '清华大学']);
 *
 * @example
 *
 * // 判断是否含有屏蔽字
 * word.contains('我喜欢去清华池')
 * // => true
 *
 * word.contains('我读了四年大学')
 * // => false
 *
 * word.contains('我不管理这个部门')
 * // => false
 *
 * @example
 *
 * // 获取包含的屏蔽字集合
 * word.words('我喜欢做网络管理员怎么了,我喜欢电脑')
 * // => ['管理员', '电脑']
 *
 * @example
 *
 * // 替换屏蔽字
 * word.replace('我是管理员', '*', true)
 * // => 我是*
 *
 * word.replace('我是管理员', '*', false)
 * // => 我是***
 *
 * word.replace('我是管理员')
 * // => 我是***
 */
const word = new SensitiveWords();

export default word;
