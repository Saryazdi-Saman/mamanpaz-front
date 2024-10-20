import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { LoggerProvider, SimpleLogRecordProcessor, ConsoleLogRecordExporter, LogRecord } from '@opentelemetry/sdk-logs';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { trace, context, Span } from '@opentelemetry/api';
import { Logger, SeverityNumber, } from '@opentelemetry/api-logs';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Usecase example
//------------------------------------------------------------------------------

// import { logInfo, logError } from '@/lib/logger';
//
// // Regular log
// logInfo('User logged in', { userId: '123' });
//
// // Log with error
// try {
//   // Some operation that might throw an error
// } catch (error) {
//   logError('Failed to process payment', { orderId: '456' }, error as Error);
// }

// File: app/api/example/route.ts
// import { log } from '@/lib/logger';
//
// export async function GET(request: Request) {
//   log('info', 'Handling GET request', { path: '/api/example' });
//   // Your route logic here
//   return new Response('Hello from the API!');
// }

// // File: app/page.tsx
// 'use client';
//
// import { useEffect } from 'react';
// import { log } from '@/lib/logger';
//
// export default function Home() {
//   useEffect(() => {
//     log('info', 'Home page mounted');
//   }, []);
//
//   return <h1>Welcome to the Home Page</h1>;
// }

const isDevelopment = process.env.NODE_ENV === 'development';

const APP_NAME = process.env.APP_NAME || 'mamanpaz-frontend';
const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || '3000';

const resource = new Resource({
    [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'unknown-service',
});

const loggerProvider = new LoggerProvider({ resource });

type Severity = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
const LogLevels: Record<Severity, SeverityNumber> = {
    TRACE: SeverityNumber.TRACE,
    DEBUG: SeverityNumber.DEBUG,
    INFO: SeverityNumber.INFO,
    WARN: SeverityNumber.WARN,
    ERROR: SeverityNumber.ERROR,
    FATAL: SeverityNumber.FATAL,
};

const MIN_LOG_LEVEL: Severity = process.env.NODE_ENV === 'production' ? 'INFO' : 'DEBUG';

if (isDevelopment) {
    // Console exporter for development
    loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(new ConsoleLogRecordExporter()));

    // File exporter for development
    const logDir = path.join(os.homedir(), 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    const fileExporter = {
        export(logs: LogRecord[]): Promise<void> {
            logs.forEach(log => {
                fs.appendFileSync(path.join(logDir, 'app.log'), JSON.stringify(log) + '\n');
            });
            return Promise.resolve();
        },
        shutdown(): Promise<void> {
            return Promise.resolve();
        },
    };
    loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(fileExporter));
} else {
    // OTLP exporter for production
    const otlpExporter = new OTLPLogExporter({
        url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318',
    });
    loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(otlpExporter));
}

const logger: Logger = loggerProvider.getLogger(`${APP_NAME}-${ENV}-${PORT}`);

interface LogAttributes {
    [key: string]: unknown;
    trace_id?: string;
    span_id?: string;
    'error.message'?: string;
    'error.stack'?: string;
}

export const log = (severity: Severity, message: string, attributes: LogAttributes = {}, error?: Error): void => {
    const severityNumber = LogLevels[severity];
    if (severityNumber < LogLevels[MIN_LOG_LEVEL]) return;

    const span: Span | undefined = trace.getSpan(context.active());
    const spanContext = span?.spanContext();

    let logAttributes = {
        ...attributes,
        'trace_id': spanContext?.traceId,
        'span_id': spanContext?.spanId,
    };

    if (error) {
        logAttributes = {
            ...logAttributes,
            'error.message': error.message,
            'error.stack': error.stack,
        };
    }

    logger.emit({
        severityText: severity,
        severityNumber: severityNumber,
        body: message,
        attributes: logAttributes,
    });
};

// Specific logging functions for ease of use
export const logTrace = (message: string, attributes?: Record<string, unknown>): void => log('TRACE', message, attributes);
export const logDebug = (message: string, attributes?: Record<string, unknown>): void => log('DEBUG', message, attributes);
export const logInfo = (message: string, attributes?: Record<string, unknown>): void => log('INFO', message, attributes);
export const logWarn = (message: string, attributes?: Record<string, unknown>): void => log('WARN', message, attributes);
export const logError = (message: string, attributes?: Record<string, unknown>): void => log('ERROR', message, attributes);
export const logFatal = (message: string, attributes?: Record<string, unknown>): void => log('FATAL', message, attributes);

// Type declaration for environment variables
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            OTEL_SERVICE_NAME: string;
            OTEL_EXPORTER_OTLP_ENDPOINT?: string;
            HOME?: string;
        }
    }
}