import { AlignedSpacerStructure } from "clumsy-math";
import { StateUpdater, useState } from "preact/hooks";
import { ClumsyButton } from "../components/ClumsyButton";
import {
  ClampedNumberInput,
  ModulusNumberInput,
} from "../components/ClumsyInput";
import { SpacerGraphics } from "./SpacerGraphics";

export function SpacerToyPage() {
  const [spacerToyState, setSpacerToyState] = useState<SpacerToyState>({
    spacerStructure: [12, [5, 0]],
  });
  return (
    <div>
      <SpacerGraphics spacerToyState={spacerToyState} />
      <SpacerControls
        spacerToyState={spacerToyState}
        setSpacerToyState={setSpacerToyState}
      />
    </div>
  );
}

export interface SpacerToyState {
  spacerStructure: AlignedSpacerStructure;
}

interface SpacerControlsProps {
  setSpacerToyState: StateUpdater<SpacerToyState>;
  spacerToyState: SpacerToyState;
}

function SpacerControls(props: SpacerControlsProps) {
  const { spacerToyState, setSpacerToyState } = props;
  const [spacerResolution, ...spacerLayers] = spacerToyState.spacerStructure;
  return (
    <div>
      <div style={{ display: "flex", padding: "0.5em" }}>
        <ClampedNumberInput
          valueStep={1}
          maxValue={60}
          minValue={spacerLayers[0][0] ?? 1}
          value={spacerResolution}
          onInput={(nextSpacerResolution) => {
            console.log(nextSpacerResolution);
            const [_, ...currentSpacerLayers] = spacerToyState.spacerStructure;
            setSpacerToyState({
              ...spacerToyState,
              spacerStructure: [nextSpacerResolution, ...currentSpacerLayers],
            });
          }}
        />
      </div>
      {spacerLayers.map((someSpacerLayer, layerIndex) => {
        const baseResolution = spacerLayers[layerIndex - 1]
          ? spacerLayers[layerIndex - 1]![0]
          : spacerResolution;
        const subResolution = spacerLayers[layerIndex + 1]
          ? spacerLayers[layerIndex + 1]![0]
          : 1;
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", padding: "0.5em" }}>
              <ClampedNumberInput
                valueStep={1}
                maxValue={baseResolution}
                minValue={subResolution}
                value={someSpacerLayer[0]}
                onInput={(nextLayerDensity) => {
                  const nextSpacerLayers = spacerLayers.map(
                    (someSpacerLayer) => [...someSpacerLayer]
                  );
                  nextSpacerLayers[layerIndex] = [nextLayerDensity, 0];
                  setSpacerToyState({
                    ...spacerToyState,
                    spacerStructure: [
                      spacerResolution,
                      ...nextSpacerLayers,
                    ] as AlignedSpacerStructure,
                  });
                }}
              />
            </div>
            <div style={{ display: "flex", padding: "0.5em" }}>
              <ModulusNumberInput
                valueStep={1}
                minValue={0}
                maxValue={someSpacerLayer[0] - 1}
                value={someSpacerLayer[1]}
                onInput={(nextLayerOrientation) => {
                  const nextSpacerLayers = spacerLayers.map(
                    (someSpacerLayer) => [...someSpacerLayer]
                  );
                  nextSpacerLayers[layerIndex]![1] = nextLayerOrientation;
                  setSpacerToyState({
                    ...spacerToyState,
                    spacerStructure: [
                      spacerResolution,
                      ...nextSpacerLayers,
                    ] as AlignedSpacerStructure,
                  });
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                padding: "0.5em",
                visibility:
                  layerIndex > 0 && layerIndex === spacerLayers.length - 1
                    ? "visible"
                    : "hidden",
              }}
            >
              <ClumsyButton
                onClick={() => {
                  const nextSpacerLayers = spacerLayers.map(
                    (someSpacerLayer) => [...someSpacerLayer]
                  );
                  nextSpacerLayers.pop();
                  setSpacerToyState({
                    ...spacerToyState,
                    spacerStructure: [
                      spacerResolution,
                      ...nextSpacerLayers,
                    ] as AlignedSpacerStructure,
                  });
                }}
              >
                remove
              </ClumsyButton>
            </div>
          </div>
        );
      })}
      <div style={{ display: "flex", padding: "0.5em" }}>
        <ClumsyButton
          onClick={() => {
            const nextSpacerLayers = spacerLayers.map((someSpacerLayer) => [
              ...someSpacerLayer,
            ]);
            nextSpacerLayers.push([
              Math.ceil(nextSpacerLayers[nextSpacerLayers.length - 1]![0]! / 2),
              0,
            ]);
            setSpacerToyState({
              ...spacerToyState,
              spacerStructure: [
                spacerResolution,
                ...nextSpacerLayers,
              ] as AlignedSpacerStructure,
            });
          }}
        >
          add layer
        </ClumsyButton>
      </div>
    </div>
  );
}

// interface ClumsyNumberInputProps
//   extends Pick<
//     JSX.HTMLAttributes<HTMLInputElement>,
//     "step" | "value" | "onInput"
//   > {}

// function ClumsyNumberInput(props: ClumsyNumberInputProps) {
//   const { step, value, onInput } = props;
//   return (
//     <div className={cssModule.numberInputContainer}>
//       <input
//         className={cssModule.numberInput}
//         type={"number"}
//         step={step}
//         // min={0}
//         // max={someSpacerLayer[0] - 1}
//         value={value}
//         onInput={onInput}
//       />
//     </div>
//   );
// }
