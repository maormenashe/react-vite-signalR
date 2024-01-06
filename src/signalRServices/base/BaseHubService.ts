import SignalRService from "./SignalRService";

class BaseHubService {
    private static _instance: unknown;
    protected signalRService: SignalRService;
    protected randomNum: number;

    protected constructor() {
        if (BaseHubService._instance) {
            throw new Error('Cannot instantiate a singleton class');
        }
        this.randomNum = Math.random();

        this.signalRService = new SignalRService(this.getHubRoute());
    }

    static getInstance<T>() {
        if (!this._instance) {
            this._instance = new this();
        }

        return this._instance as T;
    }

    protected getHubRoute(): string {
        throw new Error('getHubRoute is not implemented');
    }

    startConnection = async (onSuccess?: () => Promise<void>, onFailure?: () => Promise<void>) => {
        await this.signalRService.startConnection(onSuccess, onFailure);
    }

    stopConnection = async () => {
        await this.signalRService.stopConnection();
    }

    protected on = (methodName: string, newMethod: unknown) => {
        this.signalRService.on(methodName, newMethod as (...args: unknown[]) => unknown);
    };

    onClose = async (callback: (error?: Error) => void) => {
        this.signalRService.onClose(callback);
    }

    onReconnecting = async (callback: (error?: Error) => void) => {
        this.signalRService.onReconnecting(callback);
    }

    onReconnected = async (callback: (connectionId?: string) => void) => {
        this.signalRService.onReconnected(callback);
    }
}

export default BaseHubService;
