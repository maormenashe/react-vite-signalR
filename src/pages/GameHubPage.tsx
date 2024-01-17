import { useEffect, useState } from "react";
import GameHubService from "../signalRServices/HubServices/GameHubService";

const gameHubService = GameHubService.getInstance<GameHubService>();

export const GameHubPage = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const onServerMethodsCalled = () => {
      gameHubService.onTickUpdate(setTick);
    };

    const onClientEvents = () => {
      gameHubService.onClose((error?: Error) => {
        console.log("GameHub connection closed, error: " + error);
      });

      gameHubService.onReconnecting((error?: Error) => {
        console.log("GameHub connection failed, reconnecting, error: " + error);
      });

      gameHubService.onReconnected((connectionId?: string) => {
        console.log("GameHub reconnected, connectionId: " + connectionId);
      });
    };

    const startConnection = async () => {
      const onConnectionSuccess = async () => {
        console.log("GameHubService connected successfully");
      };

      const onConnectionFailure = async () => {
        console.log("GameHubService failed to connect");
      };

      await gameHubService.startConnection(onConnectionSuccess, onConnectionFailure);
    };

    const stopConnection = async () => {
      await gameHubService.stopConnection();
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
        Tick: <span id="tick">{tick}</span>
      </p>
    </>
  );
};
