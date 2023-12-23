import { ILogger, LogLevel } from "@microsoft/signalr";

export class CustomSignalRLogger implements ILogger {
    log(logLevel: LogLevel, message: string): void {
        // User `message` and `LogLevel` to record the log message to your own system
        console.log(`${logLevel} :: ${message}`);
    }
}