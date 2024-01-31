import { useEffect, useState } from "react";
import { PlayerActivity } from "../HubModels/GameHub/GameHubTypes";
import { getCurrentDateToSecond } from "../utilities/date.utils";
import RPSGameHubService from "../signalRServices/HubServices/RPSGameHubService";
import { RPSMove } from "../HubModels/RPSGameHub/RPSGameHubTypes";

const gameHubService = RPSGameHubService.getInstance<RPSGameHubService>();

export const RPSGameHubPage = () => {
  const [queueCount, setQueueCount] = useState(0);

  const [tick, setTick] = useState(0);
  const [isPlayerActivity, setPlayerActivity] = useState(PlayerActivity.None);
  const isInQueue = isPlayerActivity === PlayerActivity.InQueue;
  const isInGame = isPlayerActivity === PlayerActivity.InGame;

  const [isCurrentRoundTurnComplete, setIsCurrentRoundTurnComplete] = useState(false);

  useEffect(() => {
    const onServerMethodsCalled = () => {
      gameHubService.onTickUpdate(setTick);
      gameHubService.onQueueJoined(() => setPlayerActivity(PlayerActivity.InQueue));
      gameHubService.onUpdateQueue(setQueueCount);

      gameHubService.onGameStart((player) => {
        console.log(`onGameStart - ${getCurrentDateToSecond()}`, player);
        setPlayerActivity(PlayerActivity.InGame);
        setIsCurrentRoundTurnComplete(false);
        setQueueCount(0);
      });

      gameHubService.onRoundConclusion((roundConclusion) => {
        console.log(`onRoundConclusion - ${getCurrentDateToSecond()}`, roundConclusion);
        setIsCurrentRoundTurnComplete(false);
      });
    };

    const onClientEvents = () => {
      gameHubService.onClose((error?: Error) => {
        console.log("RPSGameHub connection closed, error: " + error);
      });

      gameHubService.onReconnecting((error?: Error) => {
        console.log("RPSGameHub connection failed, reconnecting, error: " + error);
      });

      gameHubService.onReconnected((connectionId?: string) => {
        console.log("RPSGameHub reconnected, connectionId: " + connectionId);
      });
    };

    const startConnection = async () => {
      const onConnectionSuccess = async () => {
        console.log("RPSGameHubService connected successfully");
      };

      const onConnectionFailure = async () => {
        console.log("RPSGameHubService failed to connect");
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

  const handleRoundMove = async (move: RPSMove) => {
    setIsCurrentRoundTurnComplete(true);
    await gameHubService.makeRoundMove(move);
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
      {isInGame && (
        <>
          <p style={{ color: "blueviolet", margin: "3rem" }}>In Game</p>
          {!isCurrentRoundTurnComplete && (
            <div style={{ margin: "1rem" }}>
              <button
                onClick={async () => await handleRoundMove(RPSMove.Rock)}
                type="button"
                style={{ padding: "1rem", marginRight: "1rem" }}
              >
                Rock Gesture
              </button>
              <button
                onClick={async () => await handleRoundMove(RPSMove.Paper)}
                type="button"
                style={{ padding: "1rem" }}
              >
                Paper Gesture
              </button>
              <button
                onClick={async () => await handleRoundMove(RPSMove.Scissors)}
                type="button"
                style={{ padding: "1rem" }}
              >
                Scissors Gesture
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};
