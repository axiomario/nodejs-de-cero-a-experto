import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs';

export class FileSystemDatasource implements LogDatasource {
    private readonly logPath = 'logs/';
    private readonly allLogsPath = `${ this.logPath }logs-all.log`;
    private readonly mediumLogsPath = `${ this.logPath }logs-medium.log`;
    private readonly highLogsPath = `${ this.logPath }logs-high.log`;

    constructor() {
        this.createLogsFiles();
    }

    public async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJSON = `${ JSON.stringify(newLog) }\n`;

        fs.appendFileSync(this.allLogsPath, logAsJSON);

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJSON);
        }
        if (newLog.level === LogSeverityLevel.high) {
            fs.appendFileSync(this.highLogsPath, logAsJSON);
        }
    }

    public async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        let path = this.allLogsPath;

        if (severityLevel === LogSeverityLevel.medium) {
            path = this.mediumLogsPath;
        }
        if (severityLevel === LogSeverityLevel.high) {
            path = this.highLogsPath;
        }

        return this.getLogsFromFile(path);
    }

    private getLogsFromFile(path: string): LogEntity[] {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(LogEntity.fromJSON);

        return logs;
    }

    private createLogsFiles(): void {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].filter(
            path => !fs.existsSync(path)
        ).forEach(
            path => fs.writeFileSync(path, '')
        );
    }
}