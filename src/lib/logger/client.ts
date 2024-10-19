interface LogMeta {
    [key: string]: any;
}

const clientLog = {
    error: (message: string, meta: LogMeta = {}) => logToServer('error', message, meta),
    warn: (message: string, meta: LogMeta = {}) => logToServer('warn', message, meta),
    info: (message: string, meta: LogMeta = {}) => logToServer('info', message, meta),
    debug: (message: string, meta: LogMeta = {}) => logToServer('debug', message, meta),
};

async function logToServer(level: string, message: string, meta: LogMeta) {
    try {
        await fetch('/api/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ level, message, meta }),
        });
    } catch (error) {
        console.error('Failed to send log to server:', error);
    }
}

export default clientLog;