import { RecursiveSpatialStructure } from "./models";

export interface IterateRecursiveSpatialStructureApi<
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

export function iterateRecursiveSpatialStructure<
  SomeRecursiveSpatialStructure extends RecursiveSpatialStructure<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >
>(api: IterateRecursiveSpatialStructureApi<SomeRecursiveSpatialStructure>) {
  const { forEach, someSpatialStructure } = api;
  forEach(someSpatialStructure);
  if (
    someSpatialStructure.structureType === "initial" ||
    someSpatialStructure.structureType === "interposed"
  ) {
    iterateRecursiveSpatialStructure({
      forEach,
      someSpatialStructure: someSpatialStructure.subStructure,
    });
  }
}
