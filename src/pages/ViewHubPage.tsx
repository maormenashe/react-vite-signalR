import { useEffect, useState } from "react";
import ViewHubService from "../signalRServices/HubServices/ViewHubService";
import { viewHubChannel } from "../event-bus/channels/view-hub.channel";

const viewHubService = ViewHubService.getInstance<ViewHubService>();

export const ViewHubPage = () => {
  const [viewCounter, setViewCounter] = useState(0);

  useEffect(() => {
    const onServerMethodsCalled = () => {
      const handleViewCountUpdate = (viewCount: number) => {
        if (viewCount % 10 === 0) {
          viewHubService.offViewCountUpdate();
        }

        setViewCounter(viewCount);
        viewHubChannel.emit("onViewCountUpdate", viewCount);
      };

      viewHubService.onViewCountUpdate(handleViewCountUpdate);
    };

    const onClientEvents = () => {
      viewHubService.onClose((error?: Error) => {
        console.log("ViewHub connection closed, error: " + error);
      });

      viewHubService.onReconnecting((error?: Error) => {
        console.log("ViewHub connection failed, reconnecting, error: " + error);
      });

      viewHubService.onReconnected((connectionId?: string) => {
        console.log("ViewHub reconnected, connectionId: " + connectionId);
      });
    };

    const startConnection = async () => {
      const onConnectionSuccess = async () => {
        console.log("ViewHubService connected successfully");

        await viewHubService.notifyWatching();
      };

      const onConnectionFailure = async () => {
        console.log("ViewHubService failed to connect");
      };

      await viewHubService.startConnection(onConnectionSuccess, onConnectionFailure);
    };

    const stopConnection = async () => {
      await viewHubService.stopConnection();
    };

    onServerMethodsCalled();
    onClientEvents();
    startConnection();
    return () => {
      stopConnection();
    };
  }, []);

  const handleIncrementServerViewCountClick = async () => {
    await viewHubService.incrementServerView();
  };

  return (
    <>
      <p>
        Current view count: <span id="viewCounter">{viewCounter}</span>
      </p>
      <div>
        <button type="button" onClick={handleIncrementServerViewCountClick}>
          Increment Server View Count
        </button>
      </div>
      <ViewHubChannelTester />
    </>
  );
};

export const ViewHubChannelTester = () => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const unsubscribeOnViewCountUpdate = viewHubChannel.on("onViewCountUpdate", setViewCount);

    return () => {
      unsubscribeOnViewCountUpdate();
    };
  }, []);
  return <div>View count: {viewCount}</div>;
};
