class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

class AuthenticationError extends ErrorHandler {
    constructor(detail) {
        const statusCode = 401
        const message = 'Unauthorized'
        super(statusCode, message)

        this.detail = detail
    }
}

class ConflictError extends ErrorHandler {
    constructor(detail) {
        const statusCode = 409
        const message = 'Conflict Error'
        super(statusCode, message)

        this.detail = detail
    }
}

class NotFoundError extends ErrorHandler {
    constructor(detail) {
        const statusCode = 404
        const message = 'Not Found'
        super(statusCode, message)

        this.detail = detail
    }
}

class ValidationError extends ErrorHandler {
    constructor(detail) {
        const statusCode = 422
        const message = 'Validation Error'
        super(statusCode, message)

        this.detail = detail
    }
}

module.exports = {
    ErrorHandler,
    AuthenticationError,
    ConflictError,
    NotFoundError,
    ValidationError,
}