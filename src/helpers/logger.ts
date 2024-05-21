import winston from 'winston';

export class Logger {
    static instance: Logger;
    static logger: winston.Logger | null;

    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        Logger.instance = this;
        Logger.logger = null;
    }

    initialize() {
        if (!Logger.logger) {
            Logger.logger = this.createLogger();
        }
    }

    private createLogger() {
        return winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'logs/combined.log' })
            ]
        });
    }

    static log(level: string, message: string) {
        Logger.logger!.log(level, message);
    }

    static error(message: string, metaData = {}) {
        Logger.logger!.error(message, metaData);
    }

    static warn(message: string) {
        Logger.logger!.warn(message);
    }

    static info(message: string) {
        Logger.logger!.info(message);
    }
}
