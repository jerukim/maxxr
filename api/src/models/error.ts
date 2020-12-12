export class CustomError extends Error {
    statusCode: number
    message: string
    detail: string

    constructor(statusCode: number, message: string) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

export class AuthenticationError extends CustomError {
    detail: string

    constructor(detail: string) {
        const statusCode = 401
        const message = 'Unauthorized'
        super(statusCode, message)

        this.detail = detail
    }
}

export class ConflictError extends CustomError {
    detail: string

    constructor(detail: string) {
        const statusCode = 409
        const message = 'Conflict Error'
        super(statusCode, message)

        this.detail = detail
    }
}

export class NotFoundError extends CustomError {
    detail: string

    constructor(detail: string) {
        const statusCode = 404
        const message = 'Not Found'
        super(statusCode, message)

        this.detail = detail
    }
}

export class ValidationError extends CustomError {
    detail: string

    constructor(detail: string) {
        const statusCode = 422
        const message = 'Validation Error'
        super(statusCode, message)

        this.detail = detail
    }
}