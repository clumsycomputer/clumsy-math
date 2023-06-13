import {
  Spacer,
  componentSpacers,
  orientatedSpacer,
  spacer,
  spacerFullSlotWeights,
  spacerGroup,
  spacerId,
  spacerLineage,
  spacerSlotWeights,
  spacerWeight,
} from "clumsy-math";
import { useMemo, useRef } from "preact/hooks";
import { SpacerToyState } from "./SpacerToyPage";

export interface UseSpacerToyDataApi {
  spacerToyState: SpacerToyState;
}

export interface SpacerToyData {
  [componentKey: string]: SpacerLayerComponentData;
}

export interface SpacerLayerComponentData {
  componentKey: string;
  componentId: string;
  terminalWeights: Array<number>;
  terminalSpacersMap: SpacerDataMap;
  terminalWeightDistributionMap: Record<string, number>;
  symmetricWeights: Array<number>;
  symmetricSpacersMap: SpacerDataMap;
  symmetricWeightDistributionMap: Record<string, number>;
}

export interface SpacerDataMap {
  [spacerId: string]: SpacerDataItem;
}

export interface SpacerDataItem {
  spacerId: string;
  spacer: Spacer;
  spacerWeight: number;
}

export function useSpacerToyData(api: UseSpacerToyDataApi) {
  const { spacerToyState } = api;
  const spacerDataCache = useRef<SpacerToyData>({});
  return useMemo(() => {
    const currentSpacerDataCache = spacerDataCache.current;
    const nextSpacerDataCache: SpacerToyData = {};
    const currentComponents = componentSpacers(spacerToyState.spacerStructure);
    Object.entries(currentComponents).forEach(
      ([componentKey, currentSpacerStructure]) => {
        const cachedSpacerData = currentSpacerDataCache[componentKey];
        const currentSpacerId = spacerId(currentSpacerStructure);
        if (currentSpacerId !== cachedSpacerData?.componentId) {
          const currentLineage = spacerLineage(currentSpacerStructure);
          const currentTerminalGroup = spacerGroup(
            currentLineage[currentLineage.length - 1]!
          );
          const currentTerminalSpacersData =
            currentTerminalGroup.reduce<SpacerDataMap>(
              (resultData, someTerminalStructure) => {
                const currentTerminalId = spacerId(someTerminalStructure);
                const currentTerminalSpacer = spacer(someTerminalStructure);
                resultData[currentTerminalId] = {
                  spacerId: currentTerminalId,
                  spacer: currentTerminalSpacer,
                  spacerWeight: NaN,
                };
                return resultData;
              },
              {}
            );
          const currentTerminalWeights = spacerSlotWeights(
            Object.values(currentTerminalSpacersData).map(
              (someTerminalSpacerData) => someTerminalSpacerData.spacer
            )
          );
          for (const currentTerminalSpacerData of Object.values(
            currentTerminalSpacersData
          )) {
            currentTerminalSpacerData.spacerWeight = spacerWeight(
              currentTerminalWeights,
              currentTerminalSpacerData.spacer
            );
          }
          const currentSpacer =
            currentTerminalSpacersData[currentSpacerId]!.spacer;
          const currentSymmetricWeights = spacerFullSlotWeights(currentSpacer);
          const symmetricSet: Array<Spacer> = currentSpacer[1].map(
            (_, spacerOrientation) =>
              orientatedSpacer(currentSpacer, spacerOrientation)
          );
          const currentSymmetricSpacersData =
            symmetricSet.reduce<SpacerDataMap>(
              (resultData, someSpacer, spacerOrientation) => {
                resultData[spacerOrientation] = {
                  spacerId: `${spacerOrientation}`,
                  spacer: someSpacer,
                  spacerWeight: spacerWeight(
                    currentSymmetricWeights,
                    someSpacer
                  ),
                };
                return resultData;
              },
              {}
            );
          const terminalWeightDistribution = Object.values(
            currentTerminalSpacersData
          ).reduce<Record<string, number>>(
            (resultData, someTerminalSpacerData) => {
              const currentWeightCount =
                resultData[someTerminalSpacerData.spacerWeight] ?? 0;
              resultData[someTerminalSpacerData.spacerWeight] =
                currentWeightCount + 1;
              return resultData;
            },
            {}
          );
          const symmetricWeightDistribution = Object.values(
            currentSymmetricSpacersData
          ).reduce<Record<string, number>>(
            (resultData, someSymmetricSpacerData) => {
              const currentWeightCount =
                resultData[someSymmetricSpacerData.spacerWeight] ?? 0;
              resultData[someSymmetricSpacerData.spacerWeight] =
                currentWeightCount + 1;
              return resultData;
            },
            {}
          );
          nextSpacerDataCache[componentKey] = {
            componentKey,
            componentId: currentSpacerId,
            terminalWeights: currentTerminalWeights,
            terminalSpacersMap: currentTerminalSpacersData,
            terminalWeightDistributionMap: terminalWeightDistribution,
            symmetricWeights: currentSymmetricWeights,
            symmetricSpacersMap: currentSymmetricSpacersData,
            symmetricWeightDistributionMap: symmetricWeightDistribution,
          };
        } else {
          nextSpacerDataCache[componentKey] = cachedSpacerData;
        }
      }
    );
    spacerDataCache.current = nextSpacerDataCache;
    return nextSpacerDataCache;
  }, [spacerToyState]);
}
