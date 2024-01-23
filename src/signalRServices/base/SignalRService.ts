import * as signalR from '@microsoft/signalr';
//import { CustomSignalRLogger } from '../logging/CustomSignalRLogger';
// import { CustomRetryPolicy } from '../reconnection/CustomRetryPolicy';

class SignalRService {
    private _connection!: signalR.HubConnection;
    private _hubUrl: string;

    get connectionId(): string | null {
        if (this._connection) return this._connection.connectionId;
        return null;
    }

    constructor(hubUrl: string) {
        this._hubUrl = hubUrl;
        this.buildNewConnection();

        // this.connection.onclose(async () => {
        //     try {
        //         await this.startConnection();
        //     } catch (err) {
        //         console.error('SignalR Connection Closed: ', err);
        //     }
        // });
    }

    private buildNewConnection() {
        this._connection = new signalR.HubConnectionBuilder()
            .withUrl(this._hubUrl, {
                // transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.ServerSentEvents,
                withCredentials: true,
                // accessTokenFactory: () => "test"
            })
            .withAutomaticReconnect()
            //.withAutomaticReconnect(new CustomRetryPolicy())
            .configureLogging(signalR.LogLevel.Information) // Optional: Set logging level
            // .configureLogging(new CustomSignalRLogger())
            .build();
    }

    startConnection = async (onSuccess?: () => Promise<void>, onFailure?: () => Promise<void>) => {
        try {
            if (this._connection.state === signalR.HubConnectionState.Disconnected) {
                await this._connection.start();
                console.log('SignalR Connected!', this._connection);
                onSuccess && await onSuccess();
            }
        } catch (err) {
            console.error('SignalR Connection Error: ', err);
            onFailure && await onFailure();
            throw err;
        }
    };

    on = (methodName: string, newMethod: (...args: unknown[]) => unknown) => {
        this._connection.on(methodName, newMethod);
    };

    off = (methodName: string, method?: (...args: unknown[]) => unknown) => {
        if (method) {
            this._connection.off(methodName, method);
            return;
        }

        this._connection.off(methodName);
    }

    invoke = async <T>(methodName: string, ...args: unknown[]): Promise<T> => {
        try {
            if (this._connection.state === signalR.HubConnectionState.Connected) {
                console.log('Invoking method: ', methodName);
                const reponse = await this._connection.invoke(methodName, ...args);
                console.log('Method invoked: ', methodName);
                return reponse;
            } else {
                throw new Error('SignalR is not connected');
            }
        } catch (err) {
            console.error(`Error invoking method ${methodName}:`, err);
            throw err;
        }
    };

    send = async (methodName: string, ...args: unknown[]) => {
        try {
            if (this._connection.state === signalR.HubConnectionState.Connected) {
                console.log('Sending method: ', methodName);
                await this._connection.send(methodName, ...args);
                console.log('Method sent: ', methodName);
            } else {
                throw new Error('SignalR is not connected');
            }
        } catch (err) {
            console.error(`Error sending method ${methodName}:`, err);
            throw err;
        }
    };

    stopConnection = async () => {
        try {
            if (this._connection.state === signalR.HubConnectionState.Connected) {
                await this._connection.stop();
                console.log('SignalR Connection Stopped');
                this.buildNewConnection();
            }
        } catch (err) {
            console.error('Error stopping connection:', err);
            throw err;
        }
    };

    onClose = async (callback: (error?: Error) => void) => {
        this._connection.onclose(callback);
    }

    onReconnecting = async (callback: (error?: Error) => void) => {
        this._connection.onreconnecting(callback);
    }

    onReconnected = async (callback: (connectionId?: string) => void) => {
        this._connection.onreconnected(callback);
    }
}

export default SignalRService;