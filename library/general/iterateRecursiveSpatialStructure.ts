import { RecursiveSpatialStructure } from "./models";

export function iterateRecursiveSpatialStructure<
  SomeRecursiveSpatialStructure extends RecursiveSpatialStructure<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >
>(
  someSpatialStructure: _IterateRecursiveSpatialStructureApi<SomeRecursiveSpatialStructure>["someSpatialStructure"],
  forEach: _IterateRecursiveSpatialStructureApi<SomeRecursiveSpatialStructure>["forEach"]
) {
  return _iterateRecursiveSpatialStructure({
    someSpatialStructure,
    forEach,
  });
}

export interface _IterateRecursiveSpatialStructureApi<
  SomeRecursiveSpatialStructure extends RecursiveSpatialStructure<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >
> {
  someSpatialStructure:
    | SomeRecursiveSpatialStructure
    | SomeRecursiveSpatialStructure["subStructure"];
  forEach: (
    someSpatialStructure:
      | SomeRecursiveSpatialStructure
      | SomeRecursiveSpatialStructure["subStructure"]
  ) => void;
}

export function _iterateRecursiveSpatialStructure<
  SomeRecursiveSpatialStructure extends RecursiveSpatialStructure<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >
>(api: _IterateRecursiveSpatialStructureApi<SomeRecursiveSpatialStructure>) {
  const { forEach, someSpatialStructure } = api;
  forEach(someSpatialStructure);
  if (
    someSpatialStructure.structureType === "initial" ||
    someSpatialStructure.structureType === "interposed"
  ) {
    _iterateRecursiveSpatialStructure({
      forEach,
      someSpatialStructure: someSpatialStructure.subStructure,
    });
  }
}
