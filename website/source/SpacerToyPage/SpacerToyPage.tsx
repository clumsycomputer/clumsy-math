import {
  AlignedSpacerStructure,
  componentSpacers,
  spacerLineage,
  spacerGroup,
  spacer,
  spacerSlotWeights,
  spacerFullSlotWeights,
  spacerId,
  spacerWeight,
  orientatedSpacer,
} from "clumsy-math";
import {
  StateUpdater,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { ClumsyButton } from "../components/ClumsyButton";
import {
  ClampedNumberInput,
  ModulusNumberInput,
} from "../components/ClumsyInput";
import { SpacerGraphics } from "./SpacerGraphics";
import { Fragment } from "preact/jsx-runtime";

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

interface UseSpacerToyDataApi {
  spacerToyState: SpacerToyState;
}

function useSpacerToyData(api: UseSpacerToyDataApi) {
  const { spacerToyState } = api;
  const spacerDataCache = useRef<any>({});
  return useMemo(() => {
    const currentSpacerDataCache = spacerDataCache.current;
    const nextSpacerDataCache: any = {};
    const currentComponents = componentSpacers(spacerToyState.spacerStructure);
    for (const [componentKey, currentSpacerStructure] of Object.entries(
      currentComponents
    )) {
      const cachedSpacerData = currentSpacerDataCache[componentKey];
      const currentSpacerId = spacerId(currentSpacerStructure);
      if (currentSpacerId !== cachedSpacerData?.id) {
        const currentLineage = spacerLineage(currentSpacerStructure);
        const currentTerminalGroup = spacerGroup(
          currentLineage[currentLineage.length - 1]!
        );
        const currentTerminalSpacersData = currentTerminalGroup.reduce<any>(
          (resultData, someTerminalStructure) => {
            const currentTerminalId = spacerId(someTerminalStructure);
            const currentTerminalSpacer = spacer(someTerminalStructure);
            resultData[currentTerminalId] = {
              id: currentTerminalId,
              spacer: currentTerminalSpacer,
            };
            return resultData;
          },
          {}
        );
        const currentTerminalWeights = spacerSlotWeights(
          Object.values<any>(currentTerminalSpacersData).map(
            (someTerminalSpacerData) => someTerminalSpacerData.spacer
          )
        );
        for (const currentTerminalSpacerData of Object.values<any>(
          currentTerminalSpacersData
        )) {
          currentTerminalSpacerData.weight = spacerWeight(
            currentTerminalWeights,
            currentTerminalSpacerData.spacer
          );
        }
        const currentSpacer =
          currentTerminalSpacersData[currentSpacerId].spacer;
        const currentSymmetricWeights = spacerFullSlotWeights(currentSpacer);
        const symmetricSet: Array<any> = currentSpacer[1].map(
          (someSpacerPoint: any, spacerOrientation: number) => {
            return orientatedSpacer(currentSpacer, spacerOrientation);
          }
        );
        const currentSymmetricSpacersData = symmetricSet.reduce<any>(
          (resultData, someSpacer, spacerOrientation) => {
            resultData[spacerOrientation] = {
              id: spacerOrientation,
              spacer: someSpacer,
              weight: spacerWeight(currentSymmetricWeights, someSpacer),
            };
            return resultData;
          },
          {}
        );
        nextSpacerDataCache[componentKey] = {
          key: componentKey,
          id: currentSpacerId,
          terminalWeights: currentTerminalWeights,
          terminalSpacers: currentTerminalSpacersData,
          symmetricWeights: currentSymmetricWeights,
          symmetricSpacers: currentSymmetricSpacersData,
        };
      } else {
        nextSpacerDataCache[componentKey] = cachedSpacerData;
      }
    }
    spacerDataCache.current = nextSpacerDataCache;
    return nextSpacerDataCache;
  }, [spacerToyState]);
}

export interface SpacerToyState {
  spacerStructure: AlignedSpacerStructure;
}

interface SpacerControlsProps {
  setSpacerToyState: StateUpdater<SpacerToyState>;
  spacerToyState: SpacerToyState;
  spacerToyData: any;
}

function SpacerControls(props: SpacerControlsProps) {
  const { spacerToyState, setSpacerToyState, spacerToyData } = props;
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
            const [_, ...currentSpacerLayers] = spacerToyState.spacerStructure;
            setSpacerToyState({
              ...spacerToyState,
              spacerStructure: [nextSpacerResolution, ...currentSpacerLayers],
            });
          }}
        />
      </div>
      {spacerLayers.map((someSpacerLayer, layerIndex) => {
        const spacerLayerData = spacerToyData[`${layerIndex}`];
        const layerTerminalSpacerData =
          spacerLayerData.terminalSpacers[spacerLayerData.id];
        const terminalDistribution = Object.values<any>(
          spacerLayerData.terminalSpacers
        ).reduce<any>((resultData, someTerminalSpacerData) => {
          const currentWeightCount =
            resultData[someTerminalSpacerData.weight] ?? 0;
          resultData[someTerminalSpacerData.weight] = currentWeightCount + 1;
          return resultData;
        }, {});
        const symmetricDistribution = Object.values<any>(
          spacerLayerData.symmetricSpacers
        ).reduce<any>((resultData, someSymmetricSpacerData) => {
          const currentWeightCount =
            resultData[someSymmetricSpacerData.weight] ?? 0;
          resultData[someSymmetricSpacerData.weight] = currentWeightCount + 1;
          return resultData;
        }, {});
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
              flexDirection: "column",
              paddingBottom: "0.25em",
            }}
          >
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
                  maxValue={someSpacerLayer[0]}
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
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ paddingInline: "0.5em", paddingBlock: "0.5em" }}>
                <WeightDistributionGraphic
                  someWeightDistribution={terminalDistribution}
                  focusedWeight={
                    spacerLayerData.terminalSpacers[spacerLayerData.id].weight
                  }
                />
                {/* {Object.keys(terminalDistribution)
                  .sort()
                  .map(
                    (someWeightKey) =>
                      `[${someWeightKey}: ${
                        terminalDistribution[someWeightKey]
                      }]${
                        someWeightKey ==
                        spacerLayerData.terminalSpacers[spacerLayerData.id]
                          .weight
                          ? "!"
                          : ""
                      }`
                  )
                  .join(" _ ")} */}
              </div>
              <div
                style={{
                  paddingInline: "0.5em",
                  paddingBlock: "0.5em",
                }}
              >
                <WeightDistributionGraphic
                  someWeightDistribution={symmetricDistribution}
                  focusedWeight={spacerLayerData.symmetricSpacers[0].weight}
                />
                {/* {Object.keys(symmetricDistribution)
                  .sort()
                  .map(
                    (someWeightKey) =>
                      `[${someWeightKey}: ${
                        symmetricDistribution[someWeightKey]
                      }]${
                        someWeightKey ==
                        spacerLayerData.symmetricSpacers[0].weight
                          ? "!"
                          : ""
                      }`
                  )
                  .join(" _ ")} */}
              </div>
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
  console.log(`${weightDistributionRangeSize}: ${weightDistributionRange}`);
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
          fill={"lightgrey"}
        />
        {sortedWeightDistribution.map((someWeightPair) => {
          return (
            <Fragment>
              <circle
                cx={someWeightPair[0] - weightDistributionRange[0] + 0.5}
                cy={0.5}
                r={radiusStep * (someWeightPair[1] - minFoo) + minRadius}
                fill={"black"}
              />
              {focusedWeight === someWeightPair[0] ? (
                <circle
                  cx={someWeightPair[0] - weightDistributionRange[0] + 0.5}
                  cy={0.5}
                  r={minRadius}
                  fill={"yellow"}
                />
              ) : null}
            </Fragment>
          );
        })}
      </svg>
    </div>
  );
}
