import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
    private prisma = new PrismaClient();

    public async saveLog(log: LogEntity): Promise<void> {
        await this.prisma.logModel.create({
            data: {
                ...log,
                level: severityEnum[log.level]
            }
        });
    }

    public async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await this.prisma.logModel.findMany({
            where: {
                level: severityEnum[severityLevel]
            }
        });

        return logs.map(LogEntity.fromObject);
    }
}