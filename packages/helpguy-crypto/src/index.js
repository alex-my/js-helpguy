import crypto from 'crypto-js';

const md5 = (word) => crypto.MD5(word).toString();

export default md5;
