const ErrorHandler = (err, req, res, next) => {
    console.log("Middleware Error Handling\nURL:", req.url,err);

    let statusCode = err.statusCode || 500;
    let errorMessage = 'Internal server error';

    if (err.code === 11000) {
        statusCode = 400;
        errorMessage = "This email address is already registered";
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
        errorMessage = {};
        for (let field in err.errors) {
            errorMessage[field] = err.errors[field].message;
        }
    }
    if (err.name == "SyntaxError") {
        errorMessage = "SyntaxError"
    }
    if (res.status == 500) {
        console.log("Middleware Error Handling\nURL:", req.url, err);
    }
    res.status(statusCode).json({ success: false, message: errorMessage });
};

module.exports.ErrorHandler = ErrorHandler