const errorHandler = (error, request, response, next) => {
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

module.exports = errorHandler