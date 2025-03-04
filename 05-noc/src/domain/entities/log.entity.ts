export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {
    constructor(
        public message: string,
        public level: LogSeverityLevel,
        public origin: string,
        public createdAt?: Date
    ) {
        if (!this.createdAt) {
            this.createdAt = new Date();
        }
    }

    static fromJSON(json: string): LogEntity {
        const { message, level, origin, createdAt } = JSON.parse(json);
        const log = new LogEntity(message, level, origin, new Date(createdAt));

        return log;
    }

    static fromObject(object: { [key: string]: any}): LogEntity {
        const { message, level, origin, createdAt } = object;
        const log = new LogEntity(message, level, origin, new Date(createdAt));

        return log;
    }
}