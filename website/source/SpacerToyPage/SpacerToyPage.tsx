import { AlignedSpacerStructure } from "clumsy-math";
import { useState } from "preact/hooks";
import { SpacerControls } from "./SpacerControls";
import { SpacerGraphics } from "./SpacerGraphics";
import { useSpacerToyData } from "./useSpacerToyData";

export function SpacerToyPage() {
  const [spacerToyState, setSpacerToyState] = useState<SpacerToyState>({
    spacerStructure: [12, [5, 0]],
  });
  const spacerToyData = useSpacerToyData({
    spacerToyState,
  });
  return (
    <div>
      <SpacerGraphics spacerToyState={spacerToyState} />
      <SpacerControls
        spacerToyState={spacerToyState}
        setSpacerToyState={setSpacerToyState}
        spacerToyData={spacerToyData}
      />
    </div>
  );
}

export interface SpacerToyState {
  spacerStructure: AlignedSpacerStructure;
}
