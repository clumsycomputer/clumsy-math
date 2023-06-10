import {
  AlignedSpacerStructure,
  componentSpacers,
  spacer,
  spacerFullSlotWeights,
} from "clumsy-math";
import { StateUpdater, useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";
import { ClumsyButton } from "../components/ClumsyButton";
import { ClumsyGraphic } from "../components/ClumsyGraphic";

export function SpacerToyPage() {
  const [spacerToyState, setSpacerToyState] = useState<SpacerToyState>({
    spacerStructure: [12, [5, 0]],
  });

  return (
    <div>
      <SpacerGraphics
        spacerToyState={spacerToyState}
        // setSpacerToyState={setSpacerToyState}
      />
      <SpacerControls
        spacerToyState={spacerToyState}
        setSpacerToyState={setSpacerToyState}
      />
    </div>
  );
}

interface SpacerGraphicsProps {
  // setSpacerToyState: StateUpdater<SpacerToyState>;
  spacerToyState: SpacerToyState;
}

function SpacerGraphics(props: SpacerGraphicsProps) {
  const { spacerToyState } = props;
  const currentSpacer = spacer(spacerToyState.spacerStructure);
  const currentComponents = componentSpacers(spacerToyState.spacerStructure);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <ClumsyGraphic
        geometryProps={{}}
        Geometry={() => {
          const cellSize = 2.25 / spacerToyState.spacerStructure[0];
          const cellSizeHalf = cellSize / 2;
          const cellPadding = cellSizeHalf * 0.25;
          const cellRadius = cellSizeHalf - cellPadding;
          return (
            <Fragment>
              {currentComponents.map((someComponent, componentIndex) => {
                const currentSpacer = spacer(someComponent);
                return currentSpacer[1].map((someSpacerPoint) => {
                  const columnIndex = someSpacerPoint;
                  const rowIndex = componentIndex;
                  return (
                    <circle
                      r={cellRadius}
                      cx={columnIndex * cellSize + cellSizeHalf - 1.125}
                      cy={rowIndex * cellSize + cellSizeHalf - 1.125}
                      fill={"yellow"}
                    />
                  );
                });
              })}
            </Fragment>
          );
        }}
      />
      <ClumsyGraphic
        geometryProps={{}}
        Geometry={() => (
          <Fragment>
            {spacerFullSlotWeights(currentSpacer).map(
              (someSlotWeight, slotIndex, currentFullSlotWeights) => {
                const pointAngle =
                  ((2 * Math.PI) / spacerToyState.spacerStructure[0]) *
                    slotIndex -
                  Math.PI / 2;
                const pointCosine = Math.cos(pointAngle);
                const pointSine = Math.sin(pointAngle);
                const radiusMax =
                  (2 * Math.PI) / currentFullSlotWeights.length / 2;
                const radiusMin = radiusMax / 4;
                const radiusRange = radiusMax - radiusMin;
                const radiusStep = radiusRange / currentFullSlotWeights[0]!;
                return someSlotWeight === 0 ? null : (
                  <circle
                    cx={pointCosine}
                    cy={pointSine}
                    r={someSlotWeight * radiusStep + radiusMin}
                    fill={"yellow"}
                  />
                );
              }
            )}
          </Fragment>
        )}
      />
    </div>
  );
}

interface SpacerToyState {
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
