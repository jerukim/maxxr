import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../models/index'

export const errorHandler = (error: CustomError, _request: Request, response: Response, _next: NextFunction) => {
    const { statusCode, message, detail } = error

    response
        .status(statusCode)
        .json({
            error: {
                code: statusCode,
                message,
                detail
            }
        })
}