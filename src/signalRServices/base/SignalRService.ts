import * as signalR from '@microsoft/signalr';
// import { CustomSignalRLogger } from '../../logging/CustomSignalRLogger';

class SignalRService {
    private connection: signalR.HubConnection;

    constructor(hubUrl: string) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl, {
                // transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.ServerSentEvents,
                withCredentials: true,
                accessTokenFactory: () => "test"
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information) // Optional: Set logging level
            // .configureLogging(new CustomSignalRLogger())
            .build();

        this.connection.onclose(async () => {
            try {
                await this.startConnection();
            } catch (err) {
                console.error('SignalR Connection Closed: ', err);
            }
        });
    }

    startConnection = async (onSuccess?: () => Promise<void>, onFailure?: () => Promise<void>) => {
        try {
            if (this.connection.state === signalR.HubConnectionState.Disconnected) {
                await this.connection.start();
                console.log('SignalR Connected!', this.connection);
                onSuccess && await onSuccess();
            }
        } catch (err) {
            console.error('SignalR Connection Error: ', err);
            onFailure && await onFailure();
            throw err;
        }
    };

    on = (methodName: string, newMethod: (...args: unknown[]) => unknown) => {
        this.connection.on(methodName, newMethod);
    };

    invoke = async <T>(methodName: string, ...args: unknown[]): Promise<T> => {
        try {
            if (this.connection.state === signalR.HubConnectionState.Connected) {
                console.log('Invoking method: ', methodName);
                const reponse = await this.connection.invoke(methodName, ...args);
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
            if (this.connection.state === signalR.HubConnectionState.Connected) {
                console.log('Sending method: ', methodName);
                await this.connection.send(methodName, ...args);
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
            if (this.connection.state === signalR.HubConnectionState.Connected) {
                await this.connection.stop();
                console.log('SignalR Connection Stopped');
            }
        } catch (err) {
            console.error('Error stopping connection:', err);
            throw err;
        }
    };
}

export default SignalRService;