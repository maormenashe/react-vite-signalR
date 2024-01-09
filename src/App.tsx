import { useState } from "react";
import "./App.css";
import { ViewHubPage } from "./pages/ViewHubPage";
import { StringToolsHubPage } from "./pages/StringToolsHubPage";
import { VoteHubPage } from "./pages/VoteHubPage";
import { ConnectionHubPage } from "./pages/ConnectionHubPage";

enum PageEnum {
  ViewHubPage,
  StringToolsHub,
  VoteHubPage,
  ConnectionHubPage,
}

function App() {
  const [targetPage, setTargetPage] = useState<PageEnum>();

  return (
    <>
      <button type="button" onClick={() => setTargetPage(PageEnum.ViewHubPage)}>
        ViewHubPage
      </button>
      <button type="button" onClick={() => setTargetPage(PageEnum.StringToolsHub)}>
        StringToolsHubPage
      </button>
      <button type="button" onClick={() => setTargetPage(PageEnum.VoteHubPage)}>
        VoteHubPage
      </button>
      <button type="button" onClick={() => setTargetPage(PageEnum.ConnectionHubPage)}>
        ConnectionHubPage
      </button>
      {targetPage === PageEnum.ViewHubPage && <ViewHubPage />}
      {targetPage === PageEnum.StringToolsHub && <StringToolsHubPage />}
      {targetPage === PageEnum.VoteHubPage && <VoteHubPage />}
      {targetPage === PageEnum.ConnectionHubPage && <ConnectionHubPage />}
    </>
  );
}

export default App;
