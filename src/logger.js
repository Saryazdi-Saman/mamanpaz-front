// logger.js
import winston from "winston";
import * as path from "path";
import * as fs from "fs";
import os from "os";

const environment = process.env.NODE_ENV || "development";
const logDirectory = path.join(os.homedir(), "logs", environment);
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ 
        filename: "app.log"
    }),
  ],
});

export { logger };