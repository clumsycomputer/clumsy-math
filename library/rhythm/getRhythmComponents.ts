import { ExtractBaseStructure } from "../general";
import { _getStackRhythmStructure } from "./getStackRhythmStructure";
import {
  AlignedRhythmStructure,
  GeneralRhythmStructure,
  PhasedRhythmComponent,
  PhasedRhythmStructure,
  RecursiveRhythmStructure,
  RhythmComponent,
  StackRhythmStructure,
} from "./encodings";

export function getPhasedRhythmComponents(
  somePhasedRhythmStructure: PhasedRhythmStructure
) {
  return _getPhasedRhythmComponents({
    somePhasedRhythmStructure,
  });
}

export interface _GetPhasedRhythmComponentsApi {
  somePhasedRhythmStructure: PhasedRhythmStructure;
}

export function _getPhasedRhythmComponents(
  api: _GetPhasedRhythmComponentsApi
): Array<PhasedRhythmComponent> {
  const { somePhasedRhythmStructure } = api;
  return getRhythmComponents({
    someRecursiveRhythmStructure: somePhasedRhythmStructure,
    getBaseStructureData: (someBasicRhythmStructure) => ({
      rhythmPhase: someBasicRhythmStructure.rhythmPhase,
    }),
  });
}

export function getAlignedRhythmComponents(
  someAlignedRhythmStructure: AlignedRhythmStructure
) {
  return _getAlignedRhythmComponents({
    someAlignedRhythmStructure,
  });
}

export interface _GetAlignedRhythmComponentsApi {
  someAlignedRhythmStructure: AlignedRhythmStructure;
}

export function _getAlignedRhythmComponents(
  api: _GetAlignedRhythmComponentsApi
): Array<AlignedRhythmStructure> {
  const { someAlignedRhythmStructure } = api;
  return getRhythmComponents({
    someRecursiveRhythmStructure: someAlignedRhythmStructure,
    getBaseStructureData: () => ({}),
  });
}

interface GetRhythmComponentsApi<
  SomeRecursiveRhythmStructure extends RecursiveRhythmStructure
> {
  someRecursiveRhythmStructure: SomeRecursiveRhythmStructure;
  getBaseStructureData: (
    someGeneralRhythmStructure: GeneralRhythmStructure
  ) => ExtractBaseStructure<SomeRecursiveRhythmStructure>;
}

function getRhythmComponents<
  SomeRecursiveRhythmStructure extends RecursiveRhythmStructure
>(
  api: GetRhythmComponentsApi<SomeRecursiveRhythmStructure>
): Array<RhythmComponent<SomeRecursiveRhythmStructure>> {
  const { someRecursiveRhythmStructure, getBaseStructureData } = api;
  return _getStackRhythmStructure({
    someRecursiveRhythmStructure,
  }).map((_, sliceIndex, baseGeneralRhythmStructure) =>
    getComponentStructure({
      getBaseStructureData,
      componentRhythmStructures: baseGeneralRhythmStructure.slice(
        0,
        sliceIndex + 1
      ),
    })
  );
}

interface GetComponentStructureApi<
  SomeRecursiveRhythmStructure extends RecursiveRhythmStructure
> extends Pick<
    GetRhythmComponentsApi<SomeRecursiveRhythmStructure>,
    "getBaseStructureData"
  > {
  componentRhythmStructures: StackRhythmStructure;
}

function getComponentStructure<
  SomeRecursiveRhythmStructure extends RecursiveRhythmStructure
>(
  api: GetComponentStructureApi<SomeRecursiveRhythmStructure>
): RhythmComponent<SomeRecursiveRhythmStructure> {
  const { componentRhythmStructures, getBaseStructureData } = api;
  const componentRhythmStructuresReversed = componentRhythmStructures.reverse();
  const initialComponentStructure = componentRhythmStructuresReversed[0];
  if (initialComponentStructure === undefined)
    throw new Error("getComponentStructure: baseRhythmStructures empty");
  let componentStructureResult: SomeRecursiveRhythmStructure = {
    structureType: "initial",
    rhythmResolution: initialComponentStructure.rhythmResolution,
    ...getBaseStructureData(initialComponentStructure),
    subStructure: {
      structureType: "terminal",
      rhythmDensity: initialComponentStructure.rhythmDensity,
      rhythmOrientation: initialComponentStructure.rhythmOrientation,
    },
  };
  componentRhythmStructuresReversed.slice(1).forEach((someBasicStructure) => {
    componentStructureResult = {
      structureType: "initial",
      rhythmResolution: someBasicStructure.rhythmResolution,
      ...getBaseStructureData(someBasicStructure),
      subStructure: {
        structureType: "interposed",
        rhythmDensity: someBasicStructure.rhythmDensity,
        rhythmOrientation: someBasicStructure.rhythmOrientation,
        ...getInterposedBaseStructureData({
          componentStructureResult,
        }),
        subStructure: componentStructureResult.subStructure,
      },
    };
  });
  return componentStructureResult;
}

interface GetInterposedBaseStructureDataApi<
  SomeRecursiveRhythmStructure extends RecursiveRhythmStructure
> {
  componentStructureResult: SomeRecursiveRhythmStructure;
}

function getInterposedBaseStructureData<
  SomeRecursiveRhythmStructure extends RecursiveRhythmStructure
>(
  api: GetInterposedBaseStructureDataApi<SomeRecursiveRhythmStructure>
): Omit<
  SomeRecursiveRhythmStructure,
  "structureType" | "rhythmResolution" | "subStructure"
> {
  const { componentStructureResult } = api;
  const {
    structureType,
    rhythmResolution,
    subStructure,
    ...interposedBaseStructureData
  } = componentStructureResult;
  return interposedBaseStructureData;
}
