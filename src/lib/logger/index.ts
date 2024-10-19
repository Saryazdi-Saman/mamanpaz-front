import { headers } from 'next/headers';

interface LogMeta {
    [key: string]: any;
}

interface LoggerMethods {
    error: (message: string, meta?: LogMeta) => void;
    warn: (message: string, meta?: LogMeta) => void;
    info: (message: string, meta?: LogMeta) => void;
    debug: (message: string, meta?: LogMeta) => void;
}

let serverLogger: LoggerMethods | null = null;

const clientLogger: LoggerMethods = {
    error: (message, meta) => console.error(message, meta),
    warn: (message, meta) => console.warn(message, meta),
    info: (message, meta) => console.info(message, meta),
    debug: (message, meta) => console.debug(message, meta),
};

async function getServerLogger(): Promise<LoggerMethods> {
    if (serverLogger) return serverLogger;

    if (typeof window === 'undefined') {
        const { createServerLogger } = await import('./server');
        serverLogger = createServerLogger();
        return serverLogger;
    }

    return clientLogger;
}

function getRequestContext(): LogMeta {
    if (typeof window !== 'undefined') return {};

    const headersList = headers();
    return {
        traceId: headersList.get('traceparent')?.split('-')[1] || 'unknown',
        requestId: headersList.get('x-request-id') || 'unknown',
        requestStartTime: headersList.get('x-request-start-time') || 'unknown',
        path: headersList.get('x-request-path') || 'unknown',
        userId: headersList.get('x-user-id') || 'anonymous',
    };
}

export const log: LoggerMethods = {
    error: async (message, meta = {}) => {
        const context = getRequestContext();
        (await getServerLogger()).error(message, { ...context, ...meta });
    },
    warn: async (message, meta = {}) => {
        const context = getRequestContext();
        (await getServerLogger()).warn(message, { ...context, ...meta });
    },
    info: async (message, meta = {}) => {
        const context = getRequestContext();
        (await getServerLogger()).info(message, { ...context, ...meta });
    },
    debug: async (message, meta = {}) => {
        const context = getRequestContext();
        (await getServerLogger()).debug(message, { ...context, ...meta });
    },
};

export default log;