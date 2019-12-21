const crypto = require('crypto-js');

class MyCrypto {
    md5(str) {
        return crypto.MD5(str).toString();
    }
}

export default MyCrypto;
