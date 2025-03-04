import { CronJob } from "cron";

type CronTime = number | Date;
type OnTick = () => void;

export class CronService {
    private constructor(private job: CronJob) {}

    public static createJob(seconds: number, onTick: OnTick) {
        const cronTime = `*/${ seconds } * * * * *`;
        const job = new CronJob(cronTime, onTick);

        job.start();

        return new CronService(job);
    }

    public stop(): void {
        this.job.stop();
    }
}