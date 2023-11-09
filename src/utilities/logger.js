const winston = require('winston');
const { createLogger, format, transports } = winston;

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: 'app.log' }),
    ],
});

module.exports = logger;