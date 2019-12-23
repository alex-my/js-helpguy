import crypto from 'crypto-js';
import tripledes from 'crypto-js/tripledes';

/**
 * MD5
 * @param {string} word
 * @returns {string}
 * @example
 *
 * md5('123456')
 * // => e10adc3949ba59abbe56e057f20f883e
 */
const md5 = (word) => crypto.MD5(word).toString();

/**
 * SHA1
 * @param {string} word
 * @returns {string}
 * @example
 *
 * sha1('123456')
 * // => 7c4a8d09ca3762af61e59520943dc26494f8941b
 */
const sha1 = (word) => crypto.SHA1(word).toString(crypto.enc.Hex);

/**
 * SHA224
 * @param {string} word
 * @returns {string}
 * @example
 *
 * sha224('123456')
 * // => f8cdb04495ded47615258f9dc6a3f4707fd2405434fefc3cbf4ef4e6
 */
const sha224 = (word) => crypto.SHA224(word).toString(crypto.enc.Hex);

/**
 * SHA256
 * @param {string} word
 * @returns {string}
 * @example
 *
 * sha256('123456')
 * // => 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
 */
const sha256 = (word) => crypto.SHA256(word).toString(crypto.enc.Hex);

/**
 * SHA384
 * @param {string} word
 * @returns {string}
 * @example
 *
 * sha384('123456')
 * // => 0a989ebc4a77b56a6e2bb7b19d995d185ce44090c13e2984b7ecc6d446d4b61ea9991b76a4c2f04b1b4d244841449454
 */
const sha384 = (word) => crypto.SHA384(word).toString(crypto.enc.Hex);

/**
 * SHA512
 * @param {string} word
 * @returns {string}
 * @example
 *
 * sha512('123456')
 * // => ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413
 */
const sha512 = (word) => crypto.SHA512(word).toString(crypto.enc.Hex);

/**
 * HMAC MD5
 * @param {string} word
 * @param {string} secret
 * @returns {string}
 * @example
 *
 * hmacMD5('123456', 'abcedf')
 * // => c6bdcc80c381536a3e85f2ee5f71cebb
 */
const hmacMD5 = (word, secret) => crypto.HmacMD5(word, secret).toString(crypto.enc.Hex);

/**
 * HMAC SHA1
 * @param {string} word
 * @param {string} secret
 * @returns {string}
 * @example
 *
 * hmacSHA1('123456', 'abcedf')
 * // => b8466fbb9634771d25d8ddd1242484bdb748b179
 */
const hmacSHA1 = (word, secret) => crypto.HmacSHA1(word, secret).toString(crypto.enc.Hex);

/**
 * HMAC SHA256
 * @param {string} word
 * @param {string} secret
 * @returns {string}
 * @example
 *
 * hmacSHA256('123456', 'abcedf')
 * // => ec4a11a5568e5cfdb5fbfe7152e8920d7bad864a0645c57fe49046a3e81ec91d
 */
const hmacSHA256 = (word, secret) => crypto.HmacSHA256(word, secret).toString(crypto.enc.Hex);

/**
 * HMAC SHA512
 * @param {string} word
 * @param {string} secret
 * @returns {string}
 *
 * @example
 *
 * hmacSHA512('123456', 'abcedf')
 * // => 130a4caafb11b798dd7528628d21f742feaad266e66141cc2ac003f0e6437cb5749245af8a3018d354e4b55e14703a5966808438afe4aae516d2824b014b5902
 */
const hmacSHA512 = (word, secret) => crypto.HmacSHA512(word, secret).toString(crypto.enc.Hex);

/**
 * BASE64 ENCODE
 * @param {string} word
 * @returns {string}
 * @example
 *
 * base64Encode('123456')
 * // => MTIzNDU2
 */
const base64Encode = (word) => crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(word));

/**
 * BASE64 DECODE
 * @param {string} word
 * @returns {string}
 * @example
 *
 * base64Decode('MTIzNDU2')
 * // => '123456'
 */
const base64Decode = (word) => crypto.enc.Base64.parse(word).toString(crypto.enc.Utf8);

/**
 * encodeURI
 * @param {string} word
 * @returns {string}
 * @example
 *
 * urlEncode('https://www.keylala.cn')
 * // => https://www.keylala.cn
 */
const urlEncode = (word) => encodeURI(word);

/**
 * decodeURI
 * @param {string} word
 * @returns {string}
 * @example
 *
 * urlDecode('https://www.keylala.cn')
 * // => https://www.keylala.cn
 */
const urlDecode = (word) => decodeURI(word);

/**
 * encodeURIComponent
 * @param {string} word
 * @returns {string}
 * @example
 *
 * urlEncode('https://www.keylala.cn')
 * // => https%3A%2F%2Fwww.keylala.cn
 */
const urlEncodeComponent = (word) => encodeURIComponent(word);

/**
 * decodeURIComponent
 * @param {string} word
 * @returns {string}
 * @example
 *
 * urlEncode('https%3A%2F%2Fwww.keylala.cn')
 * // => https://www.keylala.cn
 */
const urlDecodeComponent = (word) => decodeURIComponent(word);

/**
 * AES 加密
 * 默认填充: pkcs7padding
 * 数据块: 128位
 * @param {string} word : 要加密的内容
 * @param {string} key : 密钥
 * @param {string} iv : 密钥偏移量
 * @param {string} mode : 默认 CBC,可选 CBC, ECB
 * @param {boolean} isBase64 : 返回值是否是 base64,默认 true
 * @returns {string} 加密的内容
 */
const aesEncrypt = (word, key, iv, mode = 'CBC', isBase64 = true) => {
    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);

    let parseWord = '';
    const type = typeof word;
    if (type === 'string' || type === 'number') {
        parseWord = crypto.enc.Utf8.parse(word);
    } else if (type === 'object') {
        parseWord = crypto.enc.Utf8.parse(JSON.stringify(word));
    } else {
        return null;
    }

    let realMode = '';
    if (mode === 'CBC') {
        realMode = crypto.mode.CBC;
    } else if (mode === 'ECB') {
        realMode = crypto.mode.ECB;
    } else {
        return null;
    }

    const realPadding = crypto.pad.Pkcs7;

    const encrypted = crypto.AES.encrypt(parseWord, parseKey, {
        iv: parseIV,
        mode: realMode,
        padding: realPadding
    });
    return isBase64 ? encrypted.toString() : encrypted.ciphertext.toString();
};

/**
 * AES 解密
 * @param {string} word : 要加密的内容
 * @param {string} key : 密钥
 * @param {string} iv : 密钥偏移量
 * @param {string} mode : 默认 CBC,可选 CBC, ECB
 * @param {boolean} isBase64 : 返回值是否是 base64,默认 true
 * @returns {string} 加密的内容
 */
const aesDecrypt = (word, key, iv, mode = 'CBC', isBase64 = true) => {
    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);

    let parseWord = '';
    if (isBase64) {
        parseWord = word;
    } else {
        const parseHexWord = crypto.enc.Hex.parse(word);
        parseWord = crypto.enc.Base64.stringify(parseHexWord);
    }

    let realMode = '';
    if (mode === 'CBC') {
        realMode = crypto.mode.CBC;
    } else if (mode === 'ECB') {
        realMode = crypto.mode.ECB;
    } else {
        return null;
    }

    const realPadding = crypto.pad.Pkcs7;

    const decrypt = crypto.AES.decrypt(parseWord, parseKey, {
        iv: parseIV,
        mode: realMode,
        padding: realPadding
    });
    return decrypt.toString(crypto.enc.Utf8);
};

/**
 * tripleDesEncode
 * @param {string} word : 要加密的内容
 * @param {string} key : 密钥
 * @param {string} iv : 密钥偏移量
 * @param {CBC | ECB | CTR | CFB | OFB} mode : 默认 CBC
 * @param {boolean} isBase64 : 返回值是否是 base64,默认 true
 * @param {string} padding 填充模式, ZeroPadding, 可选 Pkcs7, Pkcs5, ZeroPadding
 * @returns {string} 加密的内容
 */
const tripleDesEncode = (word, key, iv, mode = 'CBC', isBase64 = true, padding = 'ZeroPadding') => {
    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);

    let parseWord = '';
    const type = typeof word;
    if (type === 'string' || type === 'number') {
        parseWord = crypto.enc.Utf8.parse(word);
    } else if (type === 'object') {
        parseWord = crypto.enc.Utf8.parse(JSON.stringify(word));
    } else {
        return null;
    }

    let realMode = '';
    if (mode === 'CBC') {
        realMode = crypto.mode.CBC;
    } else if (mode === 'ECB') {
        realMode = crypto.mode.ECB;
    } else if (mode === 'CTR') {
        realMode = crypto.mode.CTR;
    } else if (mode === 'CFB') {
        realMode = crypto.mode.CFB;
    } else if (mode === 'OFB') {
        realMode = crypto.mode.OFB;
    } else {
        return null;
    }

    let realPadding = crypto.pad.ZeroPadding;
    if (padding === 'Pkcs7' || padding === 'Pkcs5') {
        realPadding = crypto.pad.Pkcs7;
    }

    const encrypted = tripledes.encrypt(parseWord, parseKey, {
        iv: parseIV,
        mode: realMode,
        padding: realPadding
    });
    return isBase64 ? encrypted.toString() : encrypted.ciphertext.toString();
};

/**
 * tripleDes 解密
 * @param {string} word : 要加密的内容
 * @param {string} key : 密钥
 * @param {string} iv : 密钥偏移量
 * @param {CBC | ECB | CTR | CFB | OFB} mode : 默认 CBC
 * @param {boolean} isBase64 : 返回值是否是 base64,默认 true
 * @param {string} padding 填充模式, ZeroPadding, 可选 Pkcs7, Pkcs5, ZeroPadding
 * @returns {string} 加密的内容
 */
const tripleDesDecode = (word, key, iv, mode = 'CBC', isBase64 = true, padding = 'Pkcs7') => {
    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);

    let parseWord = '';
    if (isBase64) {
        parseWord = word;
    } else {
        const parseHexWord = crypto.enc.Hex.parse(word);
        parseWord = crypto.enc.Base64.stringify(parseHexWord);
    }

    let realMode = '';
    if (mode === 'CBC') {
        realMode = crypto.mode.CBC;
    } else if (mode === 'ECB') {
        realMode = crypto.mode.ECB;
    } else if (mode === 'CTR') {
        realMode = crypto.mode.CTR;
    } else if (mode === 'CFB') {
        realMode = crypto.mode.CFB;
    } else if (mode === 'OFB') {
        realMode = crypto.mode.OFB;
    } else {
        return null;
    }

    let realPadding = crypto.pad.ZeroPadding;
    if (padding === 'Pkcs7' || padding === 'Pkcs5') {
        realPadding = crypto.pad.Pkcs7;
    }

    const decrypt = tripledes.decrypt(parseWord, parseKey, {
        iv: parseIV,
        mode: realMode,
        padding: realPadding
    });
    return decrypt.toString(crypto.enc.Utf8);
};

/**
 * desEncrypt
 * @param {string} word : 要加密的内容
 * @param {string} key : 密钥
 * @param {string} iv : 密钥偏移量
 * @param {CBC | ECB | CTR | CFB | OFB} mode : 默认 CBC
 * @param {boolean} isBase64 : 返回值是否是 base64,默认 true
 * @param {string} padding 填充模式,默认为 ZeroPadding,可选值有 Pkcs7, Pkcs5, ZeroPadding
 * @returns {string} 加密的内容
 */
const desEncrypt = (word, key, iv, mode = 'CBC', isBase64 = true, padding = 'ZeroPadding') => {
    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);

    let parseWord = '';
    const type = typeof word;
    if (type === 'string' || type === 'number') {
        parseWord = crypto.enc.Utf8.parse(word);
    } else if (type === 'object') {
        parseWord = crypto.enc.Utf8.parse(JSON.stringify(word));
    } else {
        return null;
    }

    let realMode = '';
    if (mode === 'CBC') {
        realMode = crypto.mode.CBC;
    } else if (mode === 'ECB') {
        realMode = crypto.mode.ECB;
    } else if (mode === 'CTR') {
        realMode = crypto.mode.CTR;
    } else if (mode === 'CFB') {
        realMode = crypto.mode.CFB;
    } else if (mode === 'OFB') {
        realMode = crypto.mode.OFB;
    } else {
        return null;
    }

    let realPadding = crypto.pad.ZeroPadding;
    if (padding === 'Pkcs7' || padding === 'Pkcs5') {
        realPadding = crypto.pad.Pkcs7;
    }

    const encrypted = crypto.DES.encrypt(parseWord, parseKey, {
        iv: parseIV,
        mode: realMode,
        padding: realPadding
    });
    return isBase64 ? encrypted.toString() : encrypted.ciphertext.toString();
};

/**
 * des 解密
 * @param {string} word : 要加密的内容
 * @param {string} key : 密钥
 * @param {string} iv : 密钥偏移量
 * @param {CBC | ECB | CTR | CFB | OFB} mode : 默认 CBC
 * @param {boolean} isBase64 : 返回值是否是 base64,默认 true
 * @param {string} padding 填充模式,默认为 ZeroPadding,可选值有 Pkcs7, Pkcs5, ZeroPadding
 * @returns {string} 加密的内容
 */
const desDecrypt = (word, key, iv, mode = 'CBC', isBase64 = true, padding = 'ZeroPadding') => {
    const parseKey = crypto.enc.Utf8.parse(key);
    const parseIV = crypto.enc.Utf8.parse(iv);

    let parseWord = '';
    if (isBase64) {
        parseWord = word;
    } else {
        const parseHexWord = crypto.enc.Hex.parse(word);
        parseWord = crypto.enc.Base64.stringify(parseHexWord);
    }

    let realMode = '';
    if (mode === 'CBC') {
        realMode = crypto.mode.CBC;
    } else if (mode === 'ECB') {
        realMode = crypto.mode.ECB;
    } else if (mode === 'CTR') {
        realMode = crypto.mode.CTR;
    } else if (mode === 'CFB') {
        realMode = crypto.mode.CFB;
    } else if (mode === 'OFB') {
        realMode = crypto.mode.OFB;
    } else {
        return null;
    }

    let realPadding = crypto.pad.ZeroPadding;
    if (padding === 'Pkcs7' || padding === 'Pkcs5') {
        realPadding = crypto.pad.Pkcs7;
    }

    const decrypt = crypto.DES.decrypt(parseWord, parseKey, {
        iv: parseIV,
        mode: realMode,
        padding: realPadding
    });
    return decrypt.toString(crypto.enc.Utf8);
};

export default {
    md5,
    sha1,
    sha224,
    sha256,
    sha384,
    sha512,
    hmacMD5,
    hmacSHA1,
    hmacSHA256,
    hmacSHA512,
    base64Encode,
    base64Decode,
    urlEncode,
    urlDecode,
    urlEncodeComponent,
    urlDecodeComponent,
    aesEncrypt,
    aesDecrypt,
    tripleDesEncode,
    tripleDesDecode,
    desEncrypt,
    desDecrypt
};
