import crypto from 'crypto'
import bcrypt from 'bcrypt'

class Auth {
    async checkPassword(hash: string, plainText: string): Promise<boolean> {
        return bcrypt.compare(plainText, hash)
    }

    async hashPassword(plainText: string): Promise<string> {
        return bcrypt.hash(plainText, 10)
    }

    generateToken(): string {
        return crypto
            .randomBytes(16)
            .toString('base64')
    }
}

export default new Auth()