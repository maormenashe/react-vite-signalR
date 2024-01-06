import { useEffect, useState } from "react";
import VoteHubService from "../signalRServices/HubServices/VoteHubService";
import { VotePosition } from "../HubModels/VoteHub/VoteHubBase";

const voteHubService = VoteHubService.getInstance<VoteHubService>();

export const VoteHubPage = () => {
  const [currentVotePosition, setCurrentVotePosition] = useState<VotePosition>();

  useEffect(() => {
    const onServerMethodsCalled = () => {
      const handleUpdateVote = (votePosition: VotePosition) => {
        setCurrentVotePosition(votePosition);
      };

      voteHubService.onUpdateVotes(handleUpdateVote);
    };

    const onClientEvents = () => {
      voteHubService.onClose((error?: Error) => {
        console.log("VoteHub connection closed, error: " + error);
      });

      voteHubService.onReconnecting((error?: Error) => {
        console.log("VoteHub connection failed, reconnecting, error: " + error);
      });

      voteHubService.onReconnected((connectionId?: string) => {
        console.log("VoteHub reconnected, connectionId: " + connectionId);
      });
    };

    const startConnection = async () => {
      const onConnectionSuccess = async () => {
        console.log("VoteHubService connected successfully");

        const votePosition = await voteHubService.getCurrentVotes();
        setCurrentVotePosition(votePosition);
      };

      const onConnectionFailure = async () => {
        console.log("VoteHubService failed to connect");
      };

      await voteHubService.startConnection(onConnectionSuccess, onConnectionFailure);
    };

    const stopConnection = async () => {
      await voteHubService.stopConnection();
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
      <h1>Votes</h1>
      <br />
      <h3>
        Votes for Pie: <span id="pieVotes">{currentVotePosition?.pie || 0}</span>
      </h3>
      <h3>
        Votes for Bacon: <span id="baconVotes">{currentVotePosition?.bacon || 0}</span>
      </h3>
    </>
  );
};
