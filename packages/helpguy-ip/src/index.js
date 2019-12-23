/**
 * ip 地址转为数字
 * @param {string} ipString
 * @returns {number}
 * @example
 *
 * ipToInt('1.2.3.4')
 * // => 16909060
 *
 * ipToInt('255.255.255.255')
 * // => 4294967295
 */
const ipToInt = (ipString) => {
    if (!ipString) {
        return 0;
    }
    const s = ipString.split('.');
    return ((+s[0] * 256 + +s[1]) * 256 + +s[2]) * 256 + +s[3];
};

/**
 * 数字转为 ip 地址
 * @param {number} ipInt
 * @return {string}
 * @example
 *
 * ipToString(16909060)
 * // => 1.2.3.4
 *
 * ipToString(4294967295)
 * // => 255.255.255.255
 */
const ipToString = (ipInt) => {
    if (!ipInt) {
        return '';
    }

    let iIp = ipInt;
    let d = iIp % 256;
    for (let i = 3; i > 0; i--) {
        iIp = Math.floor(iIp / 256);
        d = `${iIp % 256}.${d}`;
    }
    return d;
};

export default {
    ipToInt,
    ipToString
};
