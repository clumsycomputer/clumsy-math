import {
  AlignedSpacerStructure,
  Spacer,
  SpacerGroupStructure,
  componentSpacers,
  orientatedSpacer,
  spacer,
  spacerGroup,
  spacerId,
  spacerLineage,
  spacerSlotWeights,
  spacerWeight,
} from "clumsy-math";
import { useMemo, useRef } from "preact/hooks";
import { SpacerToyState } from "./SpacerToyPage";

export interface UseSpacerComponentsDataApi {
  spacerToyState: SpacerToyState;
}

export type SpacerComponentsData = Array<ComponentData>;

export interface ComponentData {
  componentIndex: number;
  componentId: string;
  componentStructure: AlignedSpacerStructure;
  componentSpacer: Spacer;
  componentLineage: Array<SpacerGroupStructure>;
  terminalSpacersData: SpacerDataMap;
  terminalSlotWeights: Array<number>;
  terminalWeightDistribution: Record<string, number>;
  symmetricSpacersData: SpacerDataMap;
  symmetricSlotWeights: Array<number>;
  symmetricWeightDistribution: Record<string, number>;
}

export interface SpacerDataMap {
  [spacerId: string]: SpacerDataItem;
}

export interface SpacerDataItem {
  spacerId: string;
  spacer: Spacer;
  spacerWeight: number;
}

export function useSpacerComponentsData(api: UseSpacerComponentsDataApi) {
  const { spacerToyState } = api;
  const componentDataCacheRef = useRef<SpacerComponentsData>([]);
  return useMemo(() => {
    const componentDataCache = componentDataCacheRef.current;
    const currentComponents = componentSpacers(spacerToyState.spacerStructure);
    const nextComponentDataCache =
      currentComponents.reduce<SpacerComponentsData>(
        (resultComponentsData, componentStructure, componentIndex) => {
          const componentId = spacerId(componentStructure);
          const cachedComponentData = componentDataCache[componentIndex];
          if (componentId === cachedComponentData?.componentId) {
            resultComponentsData.push(cachedComponentData);
          } else {
            const componentLineage = spacerLineage(componentStructure);
            const terminalSpacersData = spacerGroup(
              componentLineage[componentLineage.length - 1]!
            ).reduce<SpacerDataMap>((resultData, someTerminalStructure) => {
              const terminalId = spacerId(someTerminalStructure);
              const terminalSpacer = spacer(someTerminalStructure);
              resultData[terminalId] = {
                spacerId: terminalId,
                spacer: terminalSpacer,
                spacerWeight: NaN,
              };
              return resultData;
            }, {});
            const terminalSlotWeights = spacerSlotWeights(
              Object.values(terminalSpacersData).map(
                (someTerminalSpacerData) => someTerminalSpacerData.spacer
              )
            );
            Object.values(terminalSpacersData).forEach(
              (someTerminalSpacerData) => {
                someTerminalSpacerData.spacerWeight = spacerWeight(
                  terminalSlotWeights,
                  someTerminalSpacerData.spacer
                );
              }
            );
            const terminalWeightDistribution = Object.values(
              terminalSpacersData
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
            const componentSpacer = terminalSpacersData[componentId]!.spacer;
            const symmetricSpacersData = componentSpacer[1]
              .map((_, spacerOrientation) =>
                orientatedSpacer(componentSpacer, spacerOrientation)
              )
              .reduce<SpacerDataMap>(
                (resultData, someSymmetricSpacer, symmetricOrientation) => {
                  resultData[symmetricOrientation] = {
                    spacerId: `${symmetricOrientation}`,
                    spacer: someSymmetricSpacer,
                    spacerWeight: NaN,
                  };
                  return resultData;
                },
                {}
              );
            const symmetricSlotWeights = spacerSlotWeights(
              Object.values(symmetricSpacersData).map(
                (someSymmetricSpacerData) => someSymmetricSpacerData.spacer
              )
            );
            Object.values(symmetricSpacersData).forEach(
              (someSymmetricSpacerData) => {
                someSymmetricSpacerData.spacerWeight = spacerWeight(
                  symmetricSlotWeights,
                  someSymmetricSpacerData.spacer
                );
              }
            );
            const symmetricWeightDistribution = Object.values(
              symmetricSpacersData
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
            resultComponentsData.push({
              componentIndex,
              componentId,
              componentStructure,
              componentSpacer,
              componentLineage,
              terminalSpacersData,
              terminalSlotWeights,
              terminalWeightDistribution,
              symmetricSpacersData,
              symmetricSlotWeights,
              symmetricWeightDistribution,
            });
          }
          return resultComponentsData;
        },
        []
      );
    componentDataCacheRef.current = nextComponentDataCache;
    return {
      spacerComponentsData: nextComponentDataCache,
    };
  }, [spacerToyState]);
}
