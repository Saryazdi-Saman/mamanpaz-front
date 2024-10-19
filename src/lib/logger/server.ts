import winston from 'winston';
import LokiTransport from 'winston-loki';
import path from 'path';
import os from 'os';

const LOG_DIR = process.env.NODE_ENV === 'development'
    ? path.join(os.homedir(), 'logs')
    : '/var/log/app';
console.log('LOG_DIR:', LOG_DIR);
const createServerLogger = () => {
    const logger = winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json()
        ),
        defaultMeta: {
            service: 'next-app',
            environment: process.env.NODE_ENV,
            port: process.env.PORT || '3000',
        },
        transports: [
            new winston.transports.Console({
                format: winston.format.simple(),
            }),
        ],
    });

    if (process.env.NODE_ENV === 'development') {
        logger.add(new winston.transports.File({
            filename: path.join(LOG_DIR, 'error.log'),
            level: 'error',
        }));
        logger.add(new winston.transports.File({
            filename: path.join(LOG_DIR, 'combined.log'),
        }));
    } else {
        logger.add(new LokiTransport({
            host: process.env.LOKI_HOST || 'http://localhost:3100',
            basicAuth: process.env.LOKI_AUTH,
            labels: {
                app: 'next-app',
                environment: process.env.NODE_ENV,
            },
            json: true,
            format: winston.format.json(),
            replaceTimestamp: false,
            onConnectionError: (err) => console.error(err),
        }));
    }

    const gracefulShutdown = async () => {
        console.log('Shutting down logger...');
        await Promise.all(logger.transports.map((t: any) =>
            t.flush ? t.flush() : Promise.resolve()
        ));
        console.log('Logger shut down.');
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

    return {
        error: (message: string, meta: any = {}) => {
            logger.error(message, { ...meta, stack: new Error().stack });
        },
        warn: (message: string, meta: any = {}) => {
            logger.warn(message, meta);
        },
        info: (message: string, meta: any = {}) => {
            logger.info(message, meta);
        },
        debug: (message: string, meta: any = {}) => {
            logger.debug(message, meta);
        },
    };
};

export { createServerLogger };