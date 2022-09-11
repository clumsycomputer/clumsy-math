import {
  _iterateRecursiveSpatialStructure,
  _IterateRecursiveSpatialStructureApi,
} from "../general/iterateRecursiveSpatialStructure";
import {
  AlignedRhythmStructure,
  PhasedRhythmStructure,
  RhythmStructure,
} from "./encodings";

export function getPhasedRhythmId(
  somePhasedRhythmStructure: PhasedRhythmStructure
) {
  return _getPhasedRhythmId({
    somePhasedRhythmStructure,
  });
}

export interface _GetPhasedRhythmIdApi {
  somePhasedRhythmStructure: PhasedRhythmStructure;
}

export function _getPhasedRhythmId(api: _GetPhasedRhythmIdApi): string {
  const { somePhasedRhythmStructure } = api;
  return getRhythmId({
    someRhythmStructure: somePhasedRhythmStructure,
    typeId: "phased",
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

export function getAlignedRhythmId(
  someAlignedRhythmStructure: AlignedRhythmStructure
) {
  return _getAlignedRhythmId({
    someAlignedRhythmStructure,
  });
}

export interface _GetAlignedRhythmIdApi {
  someAlignedRhythmStructure: AlignedRhythmStructure;
}

export function _getAlignedRhythmId(api: _GetAlignedRhythmIdApi): string {
  const { someAlignedRhythmStructure } = api;
  return getRhythmId({
    someRhythmStructure: someAlignedRhythmStructure,
    typeId: "aligned",
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
      _IterateRecursiveSpatialStructureApi<SomeRhythmStructure>["forEach"]
    >[0]
  ) => string;
}

function getRhythmId<SomeRhythmStructure extends RhythmStructure>(
  api: GetRhythmIdApi<SomeRhythmStructure>
) {
  const { typeId, someRhythmStructure, getStructureId } = api;
  let rhythmIdResult = `${typeId}__`;
  _iterateRecursiveSpatialStructure({
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
