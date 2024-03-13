const logger = require("./logger");

const ErrorHandler = async (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let errorMessage = 'Internal server error';
    logger.log("error", err.message, req.url)

    if (err.code === 11000) {
        statusCode = 400;
        errorMessage = "This email address is already registered";
        logger.log("error", err.message, req.url)
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
        errorMessage = {};
        for (let field in err.errors) {
            errorMessage[field] = err.errors[field].message;
        }
    } else if (err.name == "SyntaxError") {
        errorMessage = "SyntaxError"
    }
    if (res.status == 500) {
        console.log("Middleware Error Handling\nURL:", req.url, err.message);
    }
    res.status(statusCode).json({ success: false, message: errorMessage });
};

module.exports.ErrorHandler = ErrorHandler