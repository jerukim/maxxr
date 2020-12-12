const crypto = require('crypto')
const bcrypt = require('bcrypt')

class Auth {
    async checkPassword(hash, plainText) {
        return bcrypt.compare(plainText, hash)
    }

    async hashPassword(plainText) {
        return bcrypt.hash(plainText, 10)
    }

    generateToken() {
        return crypto
            .randomBytes(16)
            .toString('base64')
    }

}

module.exports = new Auth