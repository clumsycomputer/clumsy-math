import { AlignedSpacerStructure } from "clumsy-math";
import { useState } from "preact/hooks";
import { SpacerControls } from "./SpacerControls";
import { SpacerGraphics } from "./SpacerGraphics";
import { useSpacerComponentsData } from "./useSpacerComponentsData";

export interface SpacerToyState {
  spacerStructure: AlignedSpacerStructure;
}

export function SpacerToyPage() {
  const [spacerToyState, setSpacerToyState] = useState<SpacerToyState>({
    spacerStructure: [12, [5, 0]],
  });
  const { spacerComponentsData } = useSpacerComponentsData({
    spacerToyState,
  });
  return (
    <div>
      <SpacerGraphics spacerComponentsData={spacerComponentsData} />
      <SpacerControls
        spacerToyState={spacerToyState}
        spacerComponentsData={spacerComponentsData}
        updateSpacerResolution={(nextSpacerResolution) => {
          const [_, ...currentSpacerLayers] = spacerToyState.spacerStructure;
          setSpacerToyState({
            ...spacerToyState,
            spacerStructure: [nextSpacerResolution, ...currentSpacerLayers],
          });
        }}
        updateLayerDensity={(layerIndex, nextLayerDensity) => {
          const [spacerResolution, ...spacerLayers] =
            spacerToyState.spacerStructure;
          const nextSpacerLayers = spacerLayers.map((someSpacerLayer) => [
            ...someSpacerLayer,
          ]);
          nextSpacerLayers[layerIndex] = [nextLayerDensity, 0];
          setSpacerToyState({
            ...spacerToyState,
            spacerStructure: [
              spacerResolution,
              ...nextSpacerLayers,
            ] as AlignedSpacerStructure,
          });
        }}
        updateLayerOrientation={(layerIndex, nextLayerOrientation) => {
          const [spacerResolution, ...spacerLayers] =
            spacerToyState.spacerStructure;
          const nextSpacerLayers = spacerLayers.map((someSpacerLayer) => [
            ...someSpacerLayer,
          ]);
          nextSpacerLayers[layerIndex]![1] = nextLayerOrientation;
          setSpacerToyState({
            ...spacerToyState,
            spacerStructure: [
              spacerResolution,
              ...nextSpacerLayers,
            ] as AlignedSpacerStructure,
          });
        }}
        removeTerminalLayer={() => {
          const [spacerResolution, ...spacerLayers] =
            spacerToyState.spacerStructure;
          const nextSpacerLayers = spacerLayers.map((someSpacerLayer) => [
            ...someSpacerLayer,
          ]);
          nextSpacerLayers.pop();
          setSpacerToyState({
            ...spacerToyState,
            spacerStructure: [
              spacerResolution,
              ...nextSpacerLayers,
            ] as AlignedSpacerStructure,
          });
        }}
        addNewLayer={() => {
          const [spacerResolution, ...spacerLayers] =
            spacerToyState.spacerStructure;
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
      />
    </div>
  );
}
