import { useEffect, useState } from "react";
import ConnectionHubService from "../signalRServices/HubServices/ConnectionHubService";

const connectionHubService = ConnectionHubService.getInstance<ConnectionHubService>();

export const ConnectionHubPage = () => {
  const [connectionCounter, setConnectionCounter] = useState(0);

  useEffect(() => {
    const onServerMethodsCalled = () => {
      connectionHubService.onConnectionCountUpdate(setConnectionCounter);
    };

    const onClientEvents = () => {
      connectionHubService.onClose((error?: Error) => {
        console.log("ConnectionHub connection closed, error: " + error);
      });

      connectionHubService.onReconnecting((error?: Error) => {
        console.log("ConnectionHub connection failed, reconnecting, error: " + error);
      });

      connectionHubService.onReconnected((connectionId?: string) => {
        console.log("ConnectionHub reconnected, connectionId: " + connectionId);
      });
    };

    const startConnection = async () => {
      const onConnectionSuccess = async () => {
        console.log("ConnectionHub connected successfully");
      };

      const onConnectionFailure = async () => {
        console.log("ConnectionHub failed to connect");
      };

      await connectionHubService.startConnection(onConnectionSuccess, onConnectionFailure);
    };

    const stopConnection = async () => {
      await connectionHubService.stopConnection();
    };

    onServerMethodsCalled();
    onClientEvents();
    startConnection();
    return () => {
      stopConnection();
    };
  }, []);

  return (
    <>
      <p>
        Current Connection Count: <span id="connectionCounter">{connectionCounter}</span>
      </p>
    </>
  );
};
