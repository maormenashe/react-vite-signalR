import { IRetryPolicy, RetryContext } from "@microsoft/signalr";

export class CustomRetryPolicy implements IRetryPolicy {
    maxRetryAttempts = 10; // Set your desired maximum retry attempts

    nextRetryDelayInMilliseconds(retryContext: RetryContext): number | null {
        console.info(`Retry :: ${retryContext.retryReason} :: ${retryContext.elapsedMilliseconds} miliseconds`);

        // Check if previousRetryCount exceeds the maximum allowed attempts
        if (retryContext.previousRetryCount >= this.maxRetryAttempts) {
            console.log(`Maximum retry attempts (${this.maxRetryAttempts}) exceeded.`);
            return null; // Return null to stop further retries
        }

        const timeUntilNextRetry = retryContext.previousRetryCount * 1000 || 1000;
        console.log(`Retry in ${timeUntilNextRetry} miliseconds`);
        return timeUntilNextRetry;
    }

}