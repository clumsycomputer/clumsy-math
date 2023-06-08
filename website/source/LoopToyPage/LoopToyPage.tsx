import { LoopStructure } from "clumsy-math";
import { LoopGraphicDisplay } from "./LoopGraphicDisplay";

export interface LoopToyPageProps {}

export function LoopToyPage() {
  return (
    <div>
      <LoopGraphicDisplay
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
