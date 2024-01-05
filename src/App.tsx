import { useEffect, useState } from "react";
import "./App.css";
import ViewHubService from "./signalRServices/HubServices/ViewHubService";
// import FooHubService from "./signalRServices/HubServices/FooHubService";

function App() {
  const [viewCounter, setViewCounter] = useState(0);

  useEffect(() => {
    const init = async () => {
      const viewHubService = ViewHubService.getInstance<ViewHubService>();
      console.log(viewHubService);

      viewHubService.onViewCountUpdate(setViewCounter);
      await viewHubService.startConnection(async () => {
        await viewHubService.notifyWatching();
      });

      // await viewHubService.notifyWithArg("Maor", "Menashe");

      // const fooHubService = FooHubService.getInstance();
      // console.log(fooHubService);
    };

    init();
  }, []);

  return (
    <>
      <p>
        Current view count: <span id="viewCounter">{viewCounter}</span>
      </p>
      <div>{JSON.stringify(import.meta.env)}</div>
    </>
  );
}

export default App;
