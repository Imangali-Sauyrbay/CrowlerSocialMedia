import winston from 'winston'
import { fileURLToPath } from 'url'
import {dirname, resolve} from 'path'

const filepath = fileURLToPath(import.meta.url)
const logDir = resolve(dirname(filepath), '..', 'logs')

const format = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label || 'default'}] ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        format
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error', dirname: logDir }),
        new winston.transports.File({ filename: 'combined.log', dirname: logDir }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logger
  