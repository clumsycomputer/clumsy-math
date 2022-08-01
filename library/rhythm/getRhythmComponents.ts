import { iterateRecursiveSpatialStructure } from "../general/iterateRecursiveSpatialStructure";
import {
  InitialRhythmStructure,
  InterposedRhythmStructure,
  RhythmStructure,
  TerminalRhythmStructure,
} from "./models";

export interface GetRhythmComponentsApi<
  SomeRhythmStructure extends RhythmStructure
> {
  someRhythmStructure: SomeRhythmStructure;
}

export function getRhythmComponents<
  SomeRhythmStructure extends RhythmStructure
>(api: GetRhythmComponentsApi<SomeRhythmStructure>) {
  const { someRhythmStructure } = api;
  const rhythmStructureRef = getInitialStructureData({
    someRhythmStructure,
  });
  let rhythmStructureTailRef: any = rhythmStructureRef.subStructure;
  const rhythmsComponentsResult: Array<SomeRhythmStructure> = [
    getRhythmStructureCopy({
      someRhythmStructure: rhythmStructureRef,
    }),
  ];
  iterateRecursiveSpatialStructure({
    someSpatialStructure: someRhythmStructure,
    forEach: (someScopedRhythmStructure) => {
      if (someScopedRhythmStructure.structureType === "interposed") {
        const nextBaseStructureData = getBaseStructureData({
          someBaseRhythmStructure: someScopedRhythmStructure,
        });
        Object.keys(nextBaseStructureData).forEach((someBaseStructureKey) => {
          rhythmStructureTailRef[someBaseStructureKey] = (
            nextBaseStructureData as Record<string, unknown>
          )[someBaseStructureKey];
        });
        rhythmStructureTailRef = rhythmStructureTailRef.subStructure;
        rhythmsComponentsResult.push(
          getRhythmStructureCopy({
            someRhythmStructure: rhythmStructureRef,
          })
        );
      } else if (
        someScopedRhythmStructure.structureType === "initial" ||
        someScopedRhythmStructure.structureType === "terminal"
      ) {
        // no-op
      } else {
        throw new Error("getRhythmComponents: invalid path");
      }
    },
  });
  return rhythmsComponentsResult;
}

interface GetRhythmStructureCopyApi<
  SomeRhythmStructure extends RhythmStructure
> {
  someRhythmStructure: SomeRhythmStructure;
}
function getRhythmStructureCopy<SomeRhythmStructure extends RhythmStructure>(
  api: GetRhythmStructureCopyApi<SomeRhythmStructure>
): SomeRhythmStructure {
  const { someRhythmStructure } = api;
  return JSON.parse(JSON.stringify(someRhythmStructure));
}

interface GetInitialStructureDataApi<
  SomeRhythmStructure extends RhythmStructure
> {
  someRhythmStructure: SomeRhythmStructure;
}

function getInitialStructureData<SomeRhythmStructure extends RhythmStructure>(
  api: GetInitialStructureDataApi<SomeRhythmStructure>
): SomeRhythmStructure {
  const { someRhythmStructure } = api;
  return getBaseStructureData({
    someBaseRhythmStructure: someRhythmStructure,
  }) as SomeRhythmStructure;
}

interface GetBaseStructureDataApi<
  SomeBaseRhythmStructure extends
    | InitialRhythmStructure
    | InterposedRhythmStructure
> {
  someBaseRhythmStructure: SomeBaseRhythmStructure;
}

function getBaseStructureData<
  SomeBaseRhythmStructure extends
    | InitialRhythmStructure
    | InterposedRhythmStructure
>(api: GetBaseStructureDataApi<SomeBaseRhythmStructure>) {
  const { someBaseRhythmStructure } = api;
  const { subStructure, ...baseStructureData } = someBaseRhythmStructure;
  return {
    ...baseStructureData,
    subStructure: getTerminalStructureData({
      someSubRhythmStructure: someBaseRhythmStructure.subStructure,
    }),
  };
}

interface GetTerminalStructureDataApi<
  SomeSubRhythmStructure extends
    | InterposedRhythmStructure
    | TerminalRhythmStructure
> {
  someSubRhythmStructure: SomeSubRhythmStructure;
}

function getTerminalStructureData<
  SomeSubRhythmStructure extends
    | InterposedRhythmStructure
    | TerminalRhythmStructure
>(api: GetTerminalStructureDataApi<SomeSubRhythmStructure>) {
  const { someSubRhythmStructure } = api;
  return {
    structureType: "terminal",
    rhythmDensity: someSubRhythmStructure.rhythmDensity,
    rhythmOrientation: someSubRhythmStructure.rhythmOrientation,
  };
}
