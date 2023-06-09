import { LoopStructure } from "clumsy-math";
import { useState } from "preact/hooks";
import { LoopGraphics } from "./LoopGraphics";
import { LoopControls } from "./LoopControls";

export interface LoopToyPageProps {}

export function LoopToyPage() {
  const [loopToyState, setLoopToyState] = useState<LoopToyState>({
    loopStructure: [[0.5, 0.5, 0, 0, 0]],
  });
  return (
    <div>
      <LoopGraphics loopToyState={loopToyState} />
      <LoopControls
        loopToyState={loopToyState}
        setLoopToyState={setLoopToyState}
      />
    </div>
  );
}

export interface LoopToyState {
  loopStructure: LoopStructure;
}
