import { LoopStructure } from "clumsy-math";
import { LoopGraphicList } from "./LoopGraphicList";

export interface LoopToyPageProps {}

export function LoopToyPage() {
  return (
    <div>
      <LoopGraphicList
        loopToyState={{
          selectedGraphicName: "all",
          loopStructure: [[0.5, 0.5, 0, 0, 0]],
        }}
      />
    </div>
  );
}

export interface LoopToyState {
  loopStructure: LoopStructure;
  selectedGraphicName: "all" | "shape" | "sine" | "pendulum";
}
