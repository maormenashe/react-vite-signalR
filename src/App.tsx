import { useState } from "react";
import "./App.css";
import { ViewHubPage } from "./pages/ViewHubPage";
import { StringToolsHubPage } from "./pages/StringToolsHubPage";

enum PageEnum {
  ViewHubPage,
  StringToolsHub,
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
      {targetPage === PageEnum.ViewHubPage && <ViewHubPage />}
      {targetPage === PageEnum.StringToolsHub && <StringToolsHubPage />}
    </>
  );
}

export default App;
