import { JSX } from "preact";
import { Router } from "preact-router";
import { LoopToyPage } from "./LoopToyPage";
import { SpacerToyPage } from "./SpacerToyPage";

export default () => {
  return (
    <Router>
      <Route path={"/toy/loop"} Page={LoopToyPage} />
      <Route path={"/toy/spacer"} Page={SpacerToyPage} />
    </Router>
  );
};

interface RouteProps {
  path: string;
  Page: () => JSX.Element;
}

function Route(props: RouteProps) {
  const { Page } = props;
  return <Page />;
}
