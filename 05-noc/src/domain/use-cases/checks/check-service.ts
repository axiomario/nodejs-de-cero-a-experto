import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);

            if (!req.ok) {
                throw new Error(`Error on check service ${ url }`)
            }
            this.logRepository.saveLog(
                new LogEntity(`Service ${ url } working`, LogSeverityLevel.low, 'check-service.ts')
            );
            this.successCallback && this.successCallback();
        } catch (error) {
            const errorMessage = `${ url } is not ok. ${ error }`;

            this.logRepository.saveLog(
                new LogEntity(errorMessage, LogSeverityLevel.high, 'check-service.ts')
            );
            this.errorCallback && this.errorCallback(errorMessage);

            return false;
        }

        return true;
    }
}