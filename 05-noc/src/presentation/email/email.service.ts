import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    html: string;
    attachments?: Attachment[]
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor(private readonly logRepository: LogRepository) {}

    public async sendEmail({ to, subject, html, attachments = [] }: SendMailOptions): Promise<boolean> {
        try {
            const sentInformation = await this.transporter.sendMail({
                to, subject, html, attachments
            });
            this.logRepository.saveLog(
                new LogEntity('Email sent', LogSeverityLevel.medium, 'email.service.ts')
            );
        } catch (error) {
            this.logRepository.saveLog(
                new LogEntity('Email not sent', LogSeverityLevel.high, 'email.service.ts')
            );
            return false;
        }

        return true;
    }

    public async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
        const subject = 'Server logs - NOC';
        const html = 'Server logs';
        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendEmail({ to, subject, html, attachments });
    }
}