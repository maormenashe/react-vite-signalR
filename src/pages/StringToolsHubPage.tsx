import { useEffect } from "react";
import StringToolsHubService from "../signalRServices/HubServices/StringToolsHubService";

const stringToolsHubService = StringToolsHubService.getInstance<StringToolsHubService>();

export const StringToolsHubPage = () => {
  useEffect(() => {
    const onServerMethodsCalled = () => {};

    const onClientEvents = () => {
      stringToolsHubService.onClose((error?: Error) => {
        console.log("stringToolsHub connection closed, error: " + error);
      });

      stringToolsHubService.onReconnecting((error?: Error) => {
        console.log("stringToolsHub connection failed, reconnecting, error: " + error);
      });

      stringToolsHubService.onReconnected((connectionId?: string) => {
        console.log("stringToolsHub reconnected, connectionId: " + connectionId);
      });
    };

    const startConnection = async () => {
      const onConnectionSuccess = async () => {
        console.log("stringToolsHubService connected successfully");
      };

      const onConnectionFailure = async () => {
        console.log("stringToolsHubService failed to connect");
      };

      await stringToolsHubService.startConnection(onConnectionSuccess, onConnectionFailure);
    };

    const stopConnection = async () => {
      await stringToolsHubService.stopConnection();
    };

    onServerMethodsCalled();
    onClientEvents();
    startConnection();
    return () => {
      stopConnection();
    };
  }, []);

  const handleSubmitClick = async () => {
    const firstName = (document.getElementById("inputFirstName") as HTMLInputElement).value;
    const lastName = (document.getElementById("inputLastName") as HTMLInputElement).value;

    if (!firstName || !lastName) {
      alert("Please make sure you fill First Name and Last Name");
      return;
    }

    const response = await stringToolsHubService.getFullName({ firstName, lastName });
    alert(`The server has received the full name as: ${response.fullName}`);
  };

  return (
    <>
      <div>
        <label>
          First Name: <input id="inputFirstName" type="text" />
        </label>
      </div>
      <div>
        <label>
          Last Name: <input id="inputLastName" type="text" />
        </label>
      </div>

      <div>
        <button type="button" onClick={handleSubmitClick}>
          Submit
        </button>
      </div>
    </>
  );
};
