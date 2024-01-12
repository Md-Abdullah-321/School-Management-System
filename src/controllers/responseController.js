const errorResponse = (res, {statusCode = 500, message = "Internal Server Error"}) => {
    return res.status(statusCode).json({
        success: false,
        messege: message,
    })
}

const successResponse = (res, {statusCode = 200, message = "Success", payload = {}}) => {
    return res.status(statusCode).json({
        success: true,
        messege: message,
        payload,
    })
}

module.exports = {
    errorResponse,
    successResponse
}