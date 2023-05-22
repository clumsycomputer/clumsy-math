import { FunctionComponent } from "preact";
import Router, { RoutableProps } from "preact-router";
import { LoopToyPage } from "./pages/LoopToyPage";
import { RhythmToyPage } from "./pages/RhythmToyPage";

export function ClumsyMathApp() {
  return (
    <Router>
      <RoutePage path={"/toy/loop"} Content={LoopToyPage} />
      <RoutePage path={"toy/rhythm"} Content={RhythmToyPage} />
    </Router>
  );
}

interface RoutePageProps extends Required<Pick<RoutableProps, "path">> {
  Content: FunctionComponent;
}

function RoutePage(props: RoutePageProps) {
  const { Content } = props;
  return <Content />;
}
