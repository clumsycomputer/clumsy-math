import { StateUpdater } from "preact/hooks";
import { SpacerToyState } from "./SpacerToyPage";
import {
  ClampedNumberInput,
  ModulusNumberInput,
} from "../components/ClumsyInput";
import {
  SpacerComponentsData,
  useSpacerComponentsData,
} from "./useSpacerComponentsData";
import { ClumsyButton } from "../components/ClumsyButton";
import { Fragment } from "preact/jsx-runtime";
import { AlignedSpacerStructure } from "clumsy-math";
import cssModule from "./SpacerControls.module.scss";

export interface SpacerControlsProps
  extends Pick<
    ReturnType<typeof useSpacerComponentsData>,
    "spacerComponentsData"
  > {
  setSpacerToyState: StateUpdater<SpacerToyState>;
  spacerToyState: SpacerToyState;
  updateSpacerResolution: (nextSpacerResolution: number) => void;
  updateLayerDensity: (layerIndex: number, nextLayerDensity: number) => void;
  updateLayerOrientation: (
    layerIndex: number,
    nextLayerOrientation: number
  ) => void;
  removeTerminalLayer: () => void;
  addNewLayer: () => void;
}

export function SpacerControls(props: SpacerControlsProps) {
  const {
    updateSpacerResolution,
    updateLayerDensity,
    updateLayerOrientation,
    removeTerminalLayer,
    addNewLayer,
    spacerToyState,
    spacerComponentsData,
  } = props;
  const [spacerResolution, ...spacerLayers] = spacerToyState.spacerStructure;
  return (
    <div className={cssModule.controlsContainer}>
      <div className={cssModule.inputContainer}>
        <ClampedNumberInput
          valueStep={1}
          maxValue={60}
          minValue={spacerLayers[0][0] ?? 1}
          value={spacerResolution}
          onInput={(nextSpacerResolution) => {
            updateSpacerResolution(nextSpacerResolution);
          }}
        />
      </div>
      {spacerLayers.map((someSpacerLayer, layerIndex) => {
        const layerComponentData = spacerComponentsData[layerIndex]!;
        const baseResolution = spacerLayers[layerIndex - 1]
          ? spacerLayers[layerIndex - 1]![0]
          : spacerResolution;
        const subResolution = spacerLayers[layerIndex + 1]
          ? spacerLayers[layerIndex + 1]![0]
          : 1;
        return (
          <div
            key={layerComponentData.componentId}
            className={cssModule.layerContainer}
          >
            <div className={cssModule.layerControlsContainer}>
              <div className={cssModule.inputContainer}>
                <ClampedNumberInput
                  valueStep={1}
                  maxValue={baseResolution}
                  minValue={subResolution}
                  value={someSpacerLayer[0]}
                  onInput={(nextLayerDensity) => {
                    updateLayerDensity(layerIndex, nextLayerDensity);
                  }}
                />
              </div>
              <div className={cssModule.inputContainer}>
                <ModulusNumberInput
                  valueStep={1}
                  minValue={0}
                  maxValue={someSpacerLayer[0]}
                  value={someSpacerLayer[1]}
                  onInput={(nextLayerOrientation) => {
                    updateLayerOrientation(layerIndex, nextLayerOrientation);
                  }}
                />
              </div>
              <div
                className={cssModule.buttonContainer}
                style={{
                  visibility:
                    layerIndex > 0 && layerIndex === spacerLayers.length - 1
                      ? "visible"
                      : "hidden",
                }}
              >
                <ClumsyButton
                  onClick={() => {
                    removeTerminalLayer();
                  }}
                >
                  remove
                </ClumsyButton>
              </div>
            </div>
            <div className={cssModule.layerGraphicsContainer}>
              <div className={cssModule.graphicContainer}>
                <WeightDistributionGraphic
                  someWeightDistribution={
                    layerComponentData.terminalWeightDistribution
                  }
                  focusedWeight={
                    layerComponentData.terminalSpacersData[
                      layerComponentData.componentId
                    ]!.spacerWeight
                  }
                />
              </div>
              <div className={cssModule.graphicContainer}>
                <WeightDistributionGraphic
                  someWeightDistribution={
                    layerComponentData.symmetricWeightDistribution
                  }
                  focusedWeight={
                    layerComponentData.symmetricSpacersData[0]!.spacerWeight
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
      <div className={cssModule.buttonContainer}>
        <ClumsyButton
          onClick={() => {
            addNewLayer();
          }}
        >
          add layer
        </ClumsyButton>
      </div>
    </div>
  );
}

interface WeightDistributionGraphicProps {
  someWeightDistribution: Record<string, number>;
  focusedWeight: number;
}

function WeightDistributionGraphic(props: WeightDistributionGraphicProps) {
  const { someWeightDistribution, focusedWeight } = props;
  const sortedWeightDistribution = Object.keys(someWeightDistribution)
    .map<[number, number]>((someWeightKey) => [
      parseInt(someWeightKey),
      someWeightDistribution[someWeightKey]!,
    ])
    .sort((a, b) => a[0] - b[0]);
  const weightDistributionRange: [number, number] = [
    sortedWeightDistribution[0]![0],
    sortedWeightDistribution[sortedWeightDistribution.length - 1]![0],
  ];
  const weightDistributionRangeSize =
    weightDistributionRange[1] - weightDistributionRange[0] + 1;
  const maxRadius = 0.5;
  const minRadius = 0.2;
  const [minFoo, maxFoo] = sortedWeightDistribution.reduce(
    (resultRangeTuple, someWeightTuple) => [
      Math.min(someWeightTuple[1], resultRangeTuple[0] ?? someWeightTuple[1]),
      Math.max(someWeightTuple[1], resultRangeTuple[1] ?? someWeightTuple[1]),
    ],
    [0, 0]
  );
  const fooRangeSize = maxFoo - minFoo;
  const radiusRangeSize = maxRadius - minRadius;
  const radiusStep = radiusRangeSize / fooRangeSize;
  return (
    <div
      style={{
        display: "flex",
        overflow: "hidden",
        borderRadius: 4,
      }}
    >
      <svg
        height={24}
        viewBox={`-0.5 -0.5 ${weightDistributionRangeSize + 1} 2`}
      >
        <rect
          x={-0.5}
          y={-0.5}
          width={weightDistributionRangeSize + 1}
          height={2}
          fill={"grey"}
        />
        {sortedWeightDistribution.map((someWeightPair) => {
          return (
            <Fragment>
              <circle
                cx={someWeightPair[0] - weightDistributionRange[0] + 0.5}
                cy={0.5}
                r={radiusStep * (someWeightPair[1] - minFoo) + minRadius}
                fill={"yellow"}
              />
              {focusedWeight === someWeightPair[0] ? (
                <circle
                  cx={someWeightPair[0] - weightDistributionRange[0] + 0.5}
                  cy={0.5}
                  r={minRadius}
                  fill={"black"}
                />
              ) : null}
            </Fragment>
          );
        })}
      </svg>
    </div>
  );
}
