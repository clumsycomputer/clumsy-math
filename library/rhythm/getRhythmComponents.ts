import { ExtractBaseStructure } from "../general";
import { getGeneralRhythmStructure } from "./getGeneralRhythmStructure";
import {
  AlignedRhythmStructure,
  BasicRhythmStructure,
  GeneralRhythmStructure,
  PhasedRhythmStructure,
  RhythmStructure,
} from "./models";

export interface GetPhasedRhythmComponentsApi
  extends Pick<
    GetRhythmComponentsApi<PhasedRhythmStructure>,
    "someRhythmStructure"
  > {}

export function getPhasedRhythmComponents(api: GetPhasedRhythmComponentsApi) {
  const { someRhythmStructure } = api;
  return getRhythmComponents({
    someRhythmStructure,
    getBaseStructureData: (someBasicRhythmStructure) => ({
      rhythmPhase: someBasicRhythmStructure.rhythmPhase,
    }),
  });
}

export interface GetAlignedRhythmComponentsApi
  extends Pick<
    GetRhythmComponentsApi<AlignedRhythmStructure>,
    "someRhythmStructure"
  > {}

export function getAlignedRhythmComponents(api: GetAlignedRhythmComponentsApi) {
  const { someRhythmStructure } = api;
  return getRhythmComponents({
    someRhythmStructure,
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
  return getGeneralRhythmStructure({
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
