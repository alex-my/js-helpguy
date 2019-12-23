import crypto from '../src';

test('md5', () => {
    expect(crypto.md5('123456')).toBe('e10adc3949ba59abbe56e057f20f883e');
});

test('sha1', () => {
    expect(crypto.sha1('123456')).toBe('7c4a8d09ca3762af61e59520943dc26494f8941b');
});

test('sha224', () => {
    expect(crypto.sha224('123456')).toBe('f8cdb04495ded47615258f9dc6a3f4707fd2405434fefc3cbf4ef4e6');
});

test('sha256', () => {
    expect(crypto.sha256('123456')).toBe('8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
});

test('sha384', () => {
    expect(crypto.sha384('123456')).toBe('0a989ebc4a77b56a6e2bb7b19d995d185ce44090c13e2984b7ecc6d446d4b61ea9991b76a4c2f04b1b4d244841449454');
});

test('sha512', () => {
    expect(crypto.sha512('123456')).toBe('ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413');
});

test('hmacMD5', () => {
    expect(crypto.hmacMD5('123456', 'abcdef')).toBe('c6bdcc80c381536a3e85f2ee5f71cebb');
});

test('hmacSHA1', () => {
    expect(crypto.hmacSHA1('123456', 'abcdef')).toBe('b8466fbb9634771d25d8ddd1242484bdb748b179');
});

test('hmacSHA256', () => {
    expect(crypto.hmacSHA256('123456', 'abcdef')).toBe('ec4a11a5568e5cfdb5fbfe7152e8920d7bad864a0645c57fe49046a3e81ec91d');
});

test('hmacSHA512', () => {
    expect(crypto.hmacSHA512('123456', 'abcdef')).toBe(
        '130a4caafb11b798dd7528628d21f742feaad266e66141cc2ac003f0e6437cb5749245af8a3018d354e4b55e14703a5966808438afe4aae516d2824b014b5902'
    );
});

test('base64Encode', () => {
    expect(crypto.base64Encode('123456')).toBe('MTIzNDU2');
});

test('base64Decode', () => {
    expect(crypto.base64Decode('MTIzNDU2')).toBe('123456');
});

test('urlEncode', () => {
    expect(crypto.urlEncode('https://www.keylala.cn')).toBe('https://www.keylala.cn');
});

test('urlDecode', () => {
    expect(crypto.urlDecode('https://www.keylala.cn')).toBe('https://www.keylala.cn');
});

test('urlEncodeComponent', () => {
    expect(crypto.urlEncodeComponent('https://www.keylala.cn')).toBe('https%3A%2F%2Fwww.keylala.cn');
});

test('urlDecodeComponent', () => {
    expect(crypto.urlDecodeComponent('https%3A%2F%2Fwww.keylala.cn')).toBe('https://www.keylala.cn');
});

test('aesEncrypt', () => {
    const word = '123456';
    const key = '1234567890123456';
    const iv = '1234567890123456';
    const modes = ['ECB', 'CBC'];
    const base64s = [true, false];
    const values = [
        // ECB, true
        'yXVUkR45PFz0UfpbDB8/ew==',
        // ECB, false
        'c97554911e393c5cf451fa5b0c1f3f7b',
        // CBC, true
        '1jdzWuniG6UMtoa3T6uNLA==',
        // CBC, false
        'd637735ae9e21ba50cb686b74fab8d2c'
    ];

    let idx = 0;
    for (const mode of modes) {
        for (const base64 of base64s) {
            expect(crypto.aesEncrypt(word, key, iv, mode, base64)).toBe(values[idx]);
            idx++;
        }
    }
});

test('aesDecrypt', () => {
    const word = '123456';
    const key = '1234567890123456';
    const iv = '1234567890123456';
    const modes = ['ECB', 'CBC'];
    const base64s = [true, false];
    const values = [
        // ECB, true
        'yXVUkR45PFz0UfpbDB8/ew==',
        // ECB, false
        'c97554911e393c5cf451fa5b0c1f3f7b',
        // CBC, true
        '1jdzWuniG6UMtoa3T6uNLA==',
        // CBC, false
        'd637735ae9e21ba50cb686b74fab8d2c'
    ];

    let idx = 0;
    for (const mode of modes) {
        for (const base64 of base64s) {
            expect(crypto.aesDecrypt(values[idx], key, iv, mode, base64)).toBe(word);
            idx++;
        }
    }
});

test('tripleDesEncode', () => {
    const word = '123456';
    const key = '1234567890123456';
    const iv = '1234567890123456';
    const modes = ['ECB', 'CBC', 'CTR', 'CFB', 'OFB'];
    const base64s = [true, false];
    const paddings = ['ZeroPadding', 'Pkcs7', 'Pkcs5'];
    const values = [
        // mode: ECB, base64: true, padding: ZeroPadding
        'Bpq2N2u6hPQ=',
        // mode: ECB, base64: true, padding: Pkcs7
        'MDCvtRvHezU=',
        // mode: ECB, base64: true, padding: Pkcs5
        'MDCvtRvHezU=',
        // mode: ECB, base64: false, padding: ZeroPadding, result: 069ab6376bba84f4
        '069ab6376bba84f4',
        // mode: ECB, base64: false, padding: Pkcs7, result: 3030afb51bc77b35
        '3030afb51bc77b35',
        // mode: ECB, base64: false, padding: Pkcs5, result: 3030afb51bc77b35
        '3030afb51bc77b35',
        // mode: CBC, base64: true, padding: ZeroPadding, result: /s9ba2b0vhw=
        '/s9ba2b0vhw=',
        // mode: CBC, base64: true, padding: Pkcs7, result: XQG0Zs+AiMY=
        'XQG0Zs+AiMY=',
        // mode: CBC, base64: true, padding: Pkcs5, result: XQG0Zs+AiMY=
        'XQG0Zs+AiMY=',
        // mode: CBC, base64: false, padding: ZeroPadding, result: fecf5b6b66f4be1c
        'fecf5b6b66f4be1c',
        // mode: CBC, base64: false, padding: Pkcs7, result: 5d01b466cf8088c6
        '5d01b466cf8088c6',
        // mode: CBC, base64: false, padding: Pkcs5, result: 5d01b466cf8088c6
        '5d01b466cf8088c6',
        // mode: CTR, base64: true, padding: ZeroPadding, result: pUBejApjGL4=
        'pUBejApjGL4=',
        // mode: CTR, base64: true, padding: Pkcs7, result: pUBejApjGrw=
        'pUBejApjGrw=',
        // mode: CTR, base64: true, padding: Pkcs5, result: pUBejApjGrw=
        'pUBejApjGrw=',
        // mode: CTR, base64: false, padding: ZeroPadding, result: a5405e8c0a6318be
        'a5405e8c0a6318be',
        // mode: CTR, base64: false, padding: Pkcs7, result: a5405e8c0a631abc
        'a5405e8c0a631abc',
        // mode: CTR, base64: false, padding: Pkcs5, result: a5405e8c0a631abc
        'a5405e8c0a631abc',
        // mode: CFB, base64: true, padding: ZeroPadding, result: pUBejApjGL4=
        'pUBejApjGL4=',
        // mode: CFB, base64: true, padding: Pkcs7, result: pUBejApjGrw=
        'pUBejApjGrw=',
        // mode: CFB, base64: true, padding: Pkcs5, result: pUBejApjGrw=
        'pUBejApjGrw=',
        // mode: CFB, base64: false, padding: ZeroPadding, result: a5405e8c0a6318be
        'a5405e8c0a6318be',
        // mode: CFB, base64: false, padding: Pkcs7, result: a5405e8c0a631abc
        'a5405e8c0a631abc',
        // mode: CFB, base64: false, padding: Pkcs5, result: a5405e8c0a631abc
        'a5405e8c0a631abc',
        // mode: OFB, base64: true, padding: ZeroPadding, result: pUBejApjGL4=
        'pUBejApjGL4=',
        // mode: OFB, base64: true, padding: Pkcs7, result: pUBejApjGrw=
        'pUBejApjGrw=',
        // mode: OFB, base64: true, padding: Pkcs5, result: pUBejApjGrw=
        'pUBejApjGrw=',
        // mode: OFB, base64: false, padding: ZeroPadding, result: a5405e8c0a6318be
        'a5405e8c0a6318be',
        // mode: OFB, base64: false, padding: Pkcs7, result: a5405e8c0a631abc
        'a5405e8c0a631abc',
        // mode: OFB, base64: false, padding: Pkcs5, result: a5405e8c0a631abc
        'a5405e8c0a631abc'
    ];

    let idx = 0;
    for (const mode of modes) {
        for (const base64 of base64s) {
            for (const padding of paddings) {
                expect(crypto.tripleDesEncode(word, key, iv, mode, base64, padding)).toBe(values[idx]);
                idx++;
            }
        }
    }
});

test('tripleDesDecode', () => {
    const word = '123456';
    const key = '1234567890123456';
    const iv = '1234567890123456';
    const modes = ['ECB', 'CBC', 'CTR', 'CFB', 'OFB'];
    const base64s = [true, false];
    const paddings = ['ZeroPadding', 'Pkcs7', 'Pkcs5'];
    const values = [
        // mode: ECB, base64: true, padding: ZeroPadding
        'Bpq2N2u6hPQ=',
        // mode: ECB, base64: true, padding: Pkcs7
        'MDCvtRvHezU=',
        // mode: ECB, base64: true, padding: Pkcs5
        'MDCvtRvHezU=',
        // mode: ECB, base64: false, padding: ZeroPadding
        '069ab6376bba84f4',
        // mode: ECB, base64: false, padding: Pkcs7
        '3030afb51bc77b35',
        // mode: ECB, base64: false, padding: Pkcs5
        '3030afb51bc77b35',
        // mode: CBC, base64: true, padding: ZeroPadding
        '/s9ba2b0vhw=',
        // mode: CBC, base64: true, padding: Pkcs7
        'XQG0Zs+AiMY=',
        // mode: CBC, base64: true, padding: Pkcs5
        'XQG0Zs+AiMY=',
        // mode: CBC, base64: false, padding: ZeroPadding
        'fecf5b6b66f4be1c',
        // mode: CBC, base64: false, padding: Pkcs7
        '5d01b466cf8088c6',
        // mode: CBC, base64: false, padding: Pkcs5
        '5d01b466cf8088c6',
        // mode: CTR, base64: true, padding: ZeroPadding
        'pUBejApjGL4=',
        // mode: CTR, base64: true, padding: Pkcs7
        'pUBejApjGrw=',
        // mode: CTR, base64: true, padding: Pkcs5
        'pUBejApjGrw=',
        // mode: CTR, base64: false, padding: ZeroPadding
        'a5405e8c0a6318be',
        // mode: CTR, base64: false, padding: Pkcs7
        'a5405e8c0a631abc',
        // mode: CTR, base64: false, padding: Pkcs5
        'a5405e8c0a631abc',
        // mode: CFB, base64: true, padding: ZeroPadding
        'pUBejApjGL4=',
        // mode: CFB, base64: true, padding: Pkcs7
        'pUBejApjGrw=',
        // mode: CFB, base64: true, padding: Pkcs5
        'pUBejApjGrw=',
        // mode: CFB, base64: false, padding: ZeroPadding
        'a5405e8c0a6318be',
        // mode: CFB, base64: false, padding: Pkcs7
        'a5405e8c0a631abc',
        // mode: CFB, base64: false, padding: Pkcs5
        'a5405e8c0a631abc',
        // mode: OFB, base64: true, padding: ZeroPadding
        'pUBejApjGL4=',
        // mode: OFB, base64: true, padding: Pkcs7
        'pUBejApjGrw=',
        // mode: OFB, base64: true, padding: Pkcs5
        'pUBejApjGrw=',
        // mode: OFB, base64: false, padding: ZeroPadding
        'a5405e8c0a6318be',
        // mode: OFB, base64: false, padding: Pkcs7
        'a5405e8c0a631abc',
        // mode: OFB, base64: false, padding: Pkcs5
        'a5405e8c0a631abc'
    ];

    let idx = 0;
    for (const mode of modes) {
        for (const base64 of base64s) {
            for (const padding of paddings) {
                expect(crypto.tripleDesDecode(values[idx], key, iv, mode, base64, padding)).toBe(word);
                idx++;
            }
        }
    }
});

test('desEncrypt', () => {
    const word = '123456';
    const key = '1234567890123456';
    const iv = '1234567890123456';
    const modes = ['ECB', 'CBC', 'CTR', 'CFB', 'OFB'];
    const base64s = [true, false];
    const paddings = ['ZeroPadding', 'Pkcs7', 'Pkcs5'];
    const values = [
        // mode: ECB, base64: true, padding: ZeroPadding
        'uAoXvewt7nk=',
        // mode: ECB, base64: true, padding: Pkcs7
        'ED5wLgc3Mnw=',
        // mode: ECB, base64: true, padding: Pkcs5
        'ED5wLgc3Mnw=',
        // mode: ECB, base64: false, padding: ZeroPadding
        'b80a17bdec2dee79',
        // mode: ECB, base64: false, padding: Pkcs7
        '103e702e0737327c',
        // mode: ECB, base64: false, padding: Pkcs5
        '103e702e0737327c',
        // mode: CBC, base64: true, padding: ZeroPadding
        'jTxV04eLf1I=',
        // mode: CBC, base64: true, padding: Pkcs7
        'HUX+7VtHgb0=',
        // mode: CBC, base64: true, padding: Pkcs5
        'HUX+7VtHgb0=',
        // mode: CBC, base64: false, padding: ZeroPadding
        '8d3c55d3878b7f52',
        // mode: CBC, base64: false, padding: Pkcs7
        '1d45feed5b4781bd',
        // mode: CBC, base64: false, padding: Pkcs5
        '1d45feed5b4781bd',
        // mode: CTR, base64: true, padding: ZeroPadding
        'p+IxvE3jjIk=',
        // mode: CTR, base64: true, padding: Pkcs7
        'p+IxvE3jjos=',
        // mode: CTR, base64: true, padding: Pkcs5
        'p+IxvE3jjos=',
        // mode: CTR, base64: false, padding: ZeroPadding
        'a7e231bc4de38c89',
        // mode: CTR, base64: false, padding: Pkcs7
        'a7e231bc4de38e8b',
        // mode: CTR, base64: false, padding: Pkcs5
        'a7e231bc4de38e8b',
        // mode: CFB, base64: true, padding: ZeroPadding
        'p+IxvE3jjIk=',
        // mode: CFB, base64: true, padding: Pkcs7
        'p+IxvE3jjos=',
        // mode: CFB, base64: true, padding: Pkcs5
        'p+IxvE3jjos=',
        // mode: CFB, base64: false, padding: ZeroPadding
        'a7e231bc4de38c89',
        // mode: CFB, base64: false, padding: Pkcs7
        'a7e231bc4de38e8b',
        // mode: CFB, base64: false, padding: Pkcs5
        'a7e231bc4de38e8b',
        // mode: OFB, base64: true, padding: ZeroPadding
        'p+IxvE3jjIk=',
        // mode: OFB, base64: true, padding: Pkcs7
        'p+IxvE3jjos=',
        // mode: OFB, base64: true, padding: Pkcs5
        'p+IxvE3jjos=',
        // mode: OFB, base64: false, padding: ZeroPadding
        'a7e231bc4de38c89',
        // mode: OFB, base64: false, padding: Pkcs7
        'a7e231bc4de38e8b',
        // mode: OFB, base64: false, padding: Pkcs5
        'a7e231bc4de38e8b'
    ];

    let idx = 0;
    for (const mode of modes) {
        for (const base64 of base64s) {
            for (const padding of paddings) {
                expect(crypto.desEncrypt(word, key, iv, mode, base64, padding)).toBe(values[idx]);
                idx++;
            }
        }
    }
});

test('desDecrypt', () => {
    const word = '123456';
    const key = '1234567890123456';
    const iv = '1234567890123456';
    const modes = ['ECB', 'CBC', 'CTR', 'CFB', 'OFB'];
    const base64s = [true, false];
    const paddings = ['ZeroPadding', 'Pkcs7', 'Pkcs5'];
    const values = [
        // mode: ECB, base64: true, padding: ZeroPadding
        'uAoXvewt7nk=',
        // mode: ECB, base64: true, padding: Pkcs7
        'ED5wLgc3Mnw=',
        // mode: ECB, base64: true, padding: Pkcs5
        'ED5wLgc3Mnw=',
        // mode: ECB, base64: false, padding: ZeroPadding
        'b80a17bdec2dee79',
        // mode: ECB, base64: false, padding: Pkcs7
        '103e702e0737327c',
        // mode: ECB, base64: false, padding: Pkcs5
        '103e702e0737327c',
        // mode: CBC, base64: true, padding: ZeroPadding
        'jTxV04eLf1I=',
        // mode: CBC, base64: true, padding: Pkcs7
        'HUX+7VtHgb0=',
        // mode: CBC, base64: true, padding: Pkcs5
        'HUX+7VtHgb0=',
        // mode: CBC, base64: false, padding: ZeroPadding
        '8d3c55d3878b7f52',
        // mode: CBC, base64: false, padding: Pkcs7
        '1d45feed5b4781bd',
        // mode: CBC, base64: false, padding: Pkcs5
        '1d45feed5b4781bd',
        // mode: CTR, base64: true, padding: ZeroPadding
        'p+IxvE3jjIk=',
        // mode: CTR, base64: true, padding: Pkcs7
        'p+IxvE3jjos=',
        // mode: CTR, base64: true, padding: Pkcs5
        'p+IxvE3jjos=',
        // mode: CTR, base64: false, padding: ZeroPadding
        'a7e231bc4de38c89',
        // mode: CTR, base64: false, padding: Pkcs7
        'a7e231bc4de38e8b',
        // mode: CTR, base64: false, padding: Pkcs5
        'a7e231bc4de38e8b',
        // mode: CFB, base64: true, padding: ZeroPadding
        'p+IxvE3jjIk=',
        // mode: CFB, base64: true, padding: Pkcs7
        'p+IxvE3jjos=',
        // mode: CFB, base64: true, padding: Pkcs5
        'p+IxvE3jjos=',
        // mode: CFB, base64: false, padding: ZeroPadding
        'a7e231bc4de38c89',
        // mode: CFB, base64: false, padding: Pkcs7
        'a7e231bc4de38e8b',
        // mode: CFB, base64: false, padding: Pkcs5
        'a7e231bc4de38e8b',
        // mode: OFB, base64: true, padding: ZeroPadding
        'p+IxvE3jjIk=',
        // mode: OFB, base64: true, padding: Pkcs7
        'p+IxvE3jjos=',
        // mode: OFB, base64: true, padding: Pkcs5
        'p+IxvE3jjos=',
        // mode: OFB, base64: false, padding: ZeroPadding
        'a7e231bc4de38c89',
        // mode: OFB, base64: false, padding: Pkcs7
        'a7e231bc4de38e8b',
        // mode: OFB, base64: false, padding: Pkcs5
        'a7e231bc4de38e8b'
    ];

    let idx = 0;
    for (const mode of modes) {
        for (const base64 of base64s) {
            for (const padding of paddings) {
                expect(crypto.desDecrypt(values[idx], key, iv, mode, base64, padding)).toBe(word);
                idx++;
            }
        }
    }
});

test('aesEncrypt test object', () => {
    const word = {
        a: 1
    };
    const key = '1234567890123456';
    const iv = '1234567890123456';

    expect(crypto.aesEncrypt(word, key, iv)).toBe('Gwx4EHjuNUYX30ZJJNUofQ==');
});

test('tripleDesEncode test object', () => {
    const word = {
        a: 1
    };
    const key = '1234567890123456';
    const iv = '1234567890123456';

    expect(crypto.tripleDesEncode(word, key, iv)).toBe('KDbhq3oIqTA=');
});

test('desEncrypt test object', () => {
    const word = {
        a: 1
    };
    const key = '1234567890123456';
    const iv = '1234567890123456';

    expect(crypto.desEncrypt(word, key, iv)).toBe('zwlRjkwMqQU=');
});

test('aesEncrypt return null', () => {
    const word = '123456';
    const key = '1234567890123456';
    const iv = '1234567890123456';

    expect(crypto.aesEncrypt(true, key, iv)).toBeNull();
    expect(crypto.aesEncrypt(word, key, iv, 'UNKNOWN MODE')).toBeNull();
});

test('aesDecrypt return null', () => {
    const word = '1jdzWuniG6UMtoa3T6uNLA==';
    const key = '1234567890123456';
    const iv = '1234567890123456';

    expect(crypto.aesDecrypt(word, key, iv, 'UNKNOWN MODE')).toBeNull();
});

test('tripleDesEncode return null', () => {
    const word = '123456';
    const key = '1234567890123456';
    const iv = '1234567890123456';

    expect(crypto.tripleDesEncode(true, key, iv)).toBeNull();
    expect(crypto.tripleDesEncode(word, key, iv, 'UNKNOWN MODE')).toBeNull();
});

test('tripleDesDecode return null', () => {
    const word = '/s9ba2b0vhw=';
    const key = '1234567890123456';
    const iv = '1234567890123456';

    expect(crypto.tripleDesDecode(word, key, iv, 'UNKNOWN MODE')).toBeNull();
});

test('desEncrypt return null', () => {
    const word = '123456';
    const key = '1234567890123456';
    const iv = '1234567890123456';

    expect(crypto.desEncrypt(true, key, iv)).toBeNull();
    expect(crypto.desEncrypt(word, key, iv, 'UNKNOWN MODE')).toBeNull();
});

test('desDecrypt return null', () => {
    const word = 'LL+pPKZDvuo=';
    const key = '1234567890123456';
    const iv = '1234567890123456';

    expect(crypto.desDecrypt(word, key, iv, 'UNKNOWN MODE')).toBeNull();
});

test('aesDecrypt default CBC', () => {
    const word = '1jdzWuniG6UMtoa3T6uNLA==';
    const key = '1234567890123456';
    const iv = '1234567890123456';

    expect(crypto.aesDecrypt(word, key, iv)).not.toBeNull();
});

test('tripleDesDecode default CBC', () => {
    const word = '/s9ba2b0vhw=';
    const key = '1234567890123456';
    const iv = '1234567890123456';

    expect(crypto.tripleDesDecode(word, key, iv)).not.toBeNull();
});

test('desDecrypt default CBC', () => {
    const word = 'LL+pPKZDvuo=';
    const key = '1234567890123456';
    const iv = '1234567890123456';

    expect(crypto.desDecrypt(word, key, iv)).not.toBeNull();
});
