import { useEffect, useState } from "react";
import GameHubService from "../signalRServices/HubServices/GameHubService";

enum PlayerActivity {
  None,
  InQueue,
  InGame,
}

const gameHubService = GameHubService.getInstance<GameHubService>();

export const GameHubPage = () => {
  const [tick, setTick] = useState(0);
  const [isPlayerActivity, setPlayerActivity] = useState(PlayerActivity.None);
  const isInQueue = isPlayerActivity === PlayerActivity.InQueue;
  const isInGame = isPlayerActivity === PlayerActivity.InGame;
  const [queueCount, setQueueCount] = useState(0);

  useEffect(() => {
    const onServerMethodsCalled = () => {
      gameHubService.onTickUpdate(setTick);
      gameHubService.onQueueJoined(() => setPlayerActivity(PlayerActivity.InQueue));
      gameHubService.onUpdateQueue(setQueueCount);
      gameHubService.onGameStart((data) => {
        console.log("Game Started", data);
        setPlayerActivity(PlayerActivity.InGame);
        setQueueCount(0);
      });
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

  const handleJoinQueue = async () => {
    await gameHubService.joinQueue();
  };

  return (
    <>
      <p style={{ margin: "3rem" }}>
        Tick: <span id="tick">{tick}</span>
      </p>
      {!isInGame && !isInQueue && (
        <div>
          <button onClick={handleJoinQueue} type="button" style={{ color: "green", padding: "1rem" }}>
            Join Queue
          </button>
        </div>
      )}
      {isInQueue && <p style={{ color: "green", margin: "3rem" }}>In Queue</p>}
      {isInQueue && <p style={{ color: "yellow", margin: "3rem" }}>Queue Count: {queueCount}</p>}
      {isInGame && <p style={{ color: "blueviolet", margin: "3rem" }}>In Game</p>}
    </>
  );
};
