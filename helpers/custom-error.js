const { response } = require("../helpers/response");

class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

/**
 * @description Custom error handler
 * @param  {} err
 * @param  {} res
 */
const handleError = (err, res) => {
    const { statusCode, message } = err;
    let responseToSend  = response({code:1, message:message,error:err})
    return res.status(500).json(responseToSend);
};

module.exports = { ErrorHandler, handleError };