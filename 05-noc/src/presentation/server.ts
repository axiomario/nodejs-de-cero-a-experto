import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl(
    //new FileSystemDatasource()
    //new MongoLogDatasource()
    new PostgresLogDatasource()
);

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);

export class Server {
    public static start(): void {
        const emailService = new EmailService(logRepository);
        const job = CronService.createJob(2, () => {
            console.log('2 seconds');
        });

        console.log('Server started...');

        /*CronService.createJob(5, () => {
            new CheckService(
                logRepository,
                () => console.log('success'),
                (error) => console.log(error)
            ).execute('http://localhost:3000/');
        });*/
        CronService.createJob(5, () => {
            new CheckServiceMultiple(
                [
                    fileSystemLogRepository,
                    mongoLogRepository,
                    postgresLogRepository
                ],
                () => console.log('success'),
                (error) => console.log(error)
            ).execute('http://localhost:3000/');
        });

        /*emailService.sendEmail({
            to: 'axiomario@gmail.com',
            subject: 'Test',
            html: 'Hello world'
        });*/
        //emailService.sendEmailWithFileSystemLogs('axiomario@gmail.com');
        //(new SendEmailLogs(emailService, fileSystemLogRepository)).execute('axiomario@gmail.com');
    }
}