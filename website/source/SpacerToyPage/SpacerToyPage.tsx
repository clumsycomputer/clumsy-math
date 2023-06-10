import { AlignedSpacerStructure } from "clumsy-math";
import { StateUpdater, useState } from "preact/hooks";
import { ClumsyButton } from "../components/ClumsyButton";
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
      <input
        type={"number"}
        step={1}
        max={60}
        min={spacerLayers[0][0] ?? 1}
        value={spacerResolution}
        onInput={(someInputEvent) => {
          const nextSpacerResolution = parseFloat(
            someInputEvent.currentTarget.value
          );
          const [_, ...currentSpacerLayers] = spacerToyState.spacerStructure;
          setSpacerToyState({
            ...spacerToyState,
            spacerStructure: [nextSpacerResolution, ...currentSpacerLayers],
          });
        }}
      />
      {spacerLayers.map((someSpacerLayer, layerIndex) => {
        const baseResolution = spacerLayers[layerIndex - 1]
          ? spacerLayers[layerIndex - 1]![0]
          : spacerResolution;
        const subResolution = spacerLayers[layerIndex + 1]
          ? spacerLayers[layerIndex + 1]![0]
          : 1;
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              type={"number"}
              step={1}
              max={baseResolution}
              min={subResolution}
              value={someSpacerLayer[0]}
              onInput={(someInputEvent) => {
                const nextSpacerLayers = spacerLayers.map((someSpacerLayer) => [
                  ...someSpacerLayer,
                ]);
                nextSpacerLayers[layerIndex] = [
                  parseFloat(someInputEvent.currentTarget.value),
                  0,
                ];
                setSpacerToyState({
                  ...spacerToyState,
                  spacerStructure: [
                    spacerResolution,
                    ...nextSpacerLayers,
                  ] as AlignedSpacerStructure,
                });
              }}
            />
            <input
              type={"number"}
              step={1}
              min={0}
              max={someSpacerLayer[0] - 1}
              value={someSpacerLayer[1]}
              onInput={(someInputEvent) => {
                const nextSpacerLayers = spacerLayers.map((someSpacerLayer) => [
                  ...someSpacerLayer,
                ]);
                nextSpacerLayers[layerIndex]![1] = parseFloat(
                  someInputEvent.currentTarget.value
                );
                setSpacerToyState({
                  ...spacerToyState,
                  spacerStructure: [
                    spacerResolution,
                    ...nextSpacerLayers,
                  ] as AlignedSpacerStructure,
                });
              }}
            />
            <div
              style={{
                display: "flex",
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
      <div style={{ display: "flex" }}>
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
