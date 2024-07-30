class expressError extends Error{
    constructor(message, statusCode){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

exports = expressError;