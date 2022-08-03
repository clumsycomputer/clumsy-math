import { ExtractBaseStructure } from "../general";
import { _getGeneralRhythmStructure } from "./getGeneralRhythmStructure";
import {
  AlignedRhythmStructure,
  BasicRhythmStructure,
  GeneralRhythmStructure,
  PhasedRhythmStructure,
  RhythmStructure,
} from "./models";

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
): Array<PhasedRhythmStructure> {
  const { somePhasedRhythmStructure } = api;
  return getRhythmComponents({
    someRhythmStructure: somePhasedRhythmStructure,
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
    someRhythmStructure: someAlignedRhythmStructure,
    getBaseStructureData: () => ({}),
  });
}

interface GetRhythmComponentsApi<SomeRhythmStructure extends RhythmStructure> {
  someRhythmStructure: SomeRhythmStructure;
  getBaseStructureData: (
    someBasicRhythmStructure: BasicRhythmStructure
  ) => ExtractBaseStructure<SomeRhythmStructure>;
}

function getRhythmComponents<SomeRhythmStructure extends RhythmStructure>(
  api: GetRhythmComponentsApi<SomeRhythmStructure>
): Array<SomeRhythmStructure> {
  const { someRhythmStructure, getBaseStructureData } = api;
  return _getGeneralRhythmStructure({
    someRhythmStructure,
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

interface GetComponentStructureApi<SomeRhythmStructure extends RhythmStructure>
  extends Pick<
    GetRhythmComponentsApi<SomeRhythmStructure>,
    "getBaseStructureData"
  > {
  componentRhythmStructures: GeneralRhythmStructure;
}

function getComponentStructure<SomeRhythmStructure extends RhythmStructure>(
  api: GetComponentStructureApi<SomeRhythmStructure>
): SomeRhythmStructure {
  const { componentRhythmStructures, getBaseStructureData } = api;
  const componentRhythmStructuresReversed = componentRhythmStructures.reverse();
  const initialComponentStructure = componentRhythmStructuresReversed[0];
  if (initialComponentStructure === undefined)
    throw new Error("getComponentStructure: baseRhythmStructures empty");
  let componentStructureResult: SomeRhythmStructure = {
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
  SomeRhythmStructure extends RhythmStructure
> {
  componentStructureResult: SomeRhythmStructure;
}

function getInterposedBaseStructureData<
  SomeRhythmStructure extends RhythmStructure
>(
  api: GetInterposedBaseStructureDataApi<SomeRhythmStructure>
): Omit<
  SomeRhythmStructure,
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
