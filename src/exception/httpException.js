'use strict';

module.exports = class HttpException extends Error {
    constructor(message, statusCode) {
        super(message)

        Error.captureStackTrace(this, this.constructor);

        this.statusCode = statusCode;
        this.message = message;
    }
}