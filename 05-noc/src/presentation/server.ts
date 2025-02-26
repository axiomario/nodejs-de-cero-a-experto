import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
    public static start(): void {
        console.log('Server started...');

        const job = CronService.createJob(2, () => {
            console.log('2 seconds');
        });

        CronService.createJob(5, () => {
            new CheckService(
                () => console.log('success'),
                (error) => console.log(error)
            ).execute('http://localhost:3000/');
        });
    }
}