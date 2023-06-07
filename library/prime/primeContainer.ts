import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import { PrimeContainer, PrimeContainerIndex } from "./encoding";
import { isPrimeContainer } from "./primeChecks";

/**
 * great for organizing primes and who knows what else
 */
export function primeContainer(
  containerIndex: PrimeContainerIndex
): PrimeContainer {
  return (
    primeContainerNumbering(containerIndex)[containerIndex] ??
    throwInvalidPathError("primeContainer")
  );
}

/**
 * use for working with the first n prime containers
 */
export function primeContainerNumbering(
  maxContainerIndex: PrimeContainerIndex
): Array<PrimeContainer> {
  const resultContainers: Array<PrimeContainer> = [];
  let n = 4;
  while (resultContainers.length < maxContainerIndex + 1) {
    if (isPrimeContainer(n)) {
      resultContainers.push(n);
    }
    n = n + 1;
  }
  return resultContainers;
}
