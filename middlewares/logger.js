const { transports, createLogger, format } = require("winston");
const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
    level: "debug",
    format: combine(
        timestamp({
            format: "MMM-DD-YYYY HH:mm:ss"
        }),
        prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: "logs.log"})
    ]
});

module.exports = logger;