import {
  iterateRecursiveSpatialStructure,
  IterateRecursiveSpatialStructureApi,
} from "../general/iterateRecursiveSpatialStructure";
import {
  AlignedRhythmStructure,
  PhasedRhythmStructure,
  RhythmStructure,
} from "./models";

export interface GetPhasedRhythmIdApi {
  somePhasedRhythmStructure: PhasedRhythmStructure;
}

export function getPhasedRhythmId(api: GetPhasedRhythmIdApi): string {
  const { somePhasedRhythmStructure } = api;
  return getRhythmId({
    someRhythmStructure: somePhasedRhythmStructure,
    typeId: "phasedrhythm",
    getStructureId: (someRhythmStructure) => {
      if (someRhythmStructure.structureType === "initial") {
        return `${someRhythmStructure.rhythmResolution}_${someRhythmStructure.rhythmPhase}`;
      } else if (someRhythmStructure.structureType === "interposed") {
        return `${someRhythmStructure.rhythmDensity}_${someRhythmStructure.rhythmOrientation}_${someRhythmStructure.rhythmPhase}`;
      } else if (someRhythmStructure.structureType === "terminal") {
        return `${someRhythmStructure.rhythmDensity}_${someRhythmStructure.rhythmOrientation}`;
      } else {
        throw new Error("getPhasedRhythmId: invalid path");
      }
    },
  });
}

export interface GetAlignedRhythmIdApi {
  someAlignedRhythmStructure: AlignedRhythmStructure;
}

export function getAlignedRhythmId(api: GetAlignedRhythmIdApi): string {
  const { someAlignedRhythmStructure } = api;
  return getRhythmId({
    someRhythmStructure: someAlignedRhythmStructure,
    typeId: "alignedrhythm",
    getStructureId: (someRhythmStructure) => {
      if (someRhythmStructure.structureType === "initial") {
        return `${someRhythmStructure.rhythmResolution}`;
      } else if (
        someRhythmStructure.structureType === "interposed" ||
        someRhythmStructure.structureType === "terminal"
      ) {
        return `${someRhythmStructure.rhythmDensity}_${someRhythmStructure.rhythmOrientation}`;
      } else {
        throw new Error("getAlignedRhythmId: invalid path");
      }
    },
  });
}

interface GetRhythmIdApi<SomeRhythmStructure extends RhythmStructure> {
  someRhythmStructure: SomeRhythmStructure;
  typeId: string;
  getStructureId: (
    someRhythmStructure: Parameters<
      IterateRecursiveSpatialStructureApi<SomeRhythmStructure>["forEach"]
    >[0]
  ) => string;
}

function getRhythmId<SomeRhythmStructure extends RhythmStructure>(
  api: GetRhythmIdApi<SomeRhythmStructure>
) {
  const { typeId, someRhythmStructure, getStructureId } = api;
  let rhythmIdResult = `${typeId}__`;
  iterateRecursiveSpatialStructure({
    someSpatialStructure: someRhythmStructure,
    forEach: (someRhythmStructure) => {
      const structureSpacer =
        someRhythmStructure.structureType === "terminal" ? "" : "__";
      rhythmIdResult = `${rhythmIdResult}${getStructureId(
        someRhythmStructure
      )}${structureSpacer}`;
    },
  });
  return rhythmIdResult;
}
