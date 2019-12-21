const crypto = require('crypto-js');

class MyCrypto {
  md5(str) {
    console.log('hello md5 ...');
    const a = {
      a: 'bc1',
    };
    return crypto.MD5(str).toString();
  }
}

export default MyCrypto;
