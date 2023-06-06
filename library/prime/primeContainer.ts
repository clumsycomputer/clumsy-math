import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import { isPrimeContainer } from "./primeChecks";

export function primeContainer(containerIndex: number) {
  return (
    primeContainerNumbering(containerIndex)[containerIndex] ??
    throwInvalidPathError("primeContainer")
  );
}

export function primeContainerNumbering(
  maxContainerIndex: number
): Array<number> {
  const resultContainers: Array<number> = [];
  let n = 4;
  while (resultContainers.length < maxContainerIndex + 1) {
    if (isPrimeContainer(n)) {
      resultContainers.push(n);
    }
    n = n + 1;
  }
  return resultContainers;
}
