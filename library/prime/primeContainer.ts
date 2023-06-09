import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import { PrimeContainer, PrimeContainerIndex } from "./encoding";
import { isPrimeContainer } from "./primeChecks";

/**
 * great for organizing primes and who knows what else
 *
 * @example
 * ```typescript
 * primeContainer(0) // 4
 * primeContainer(1) // 6
 * primeContainer(2) // 12
 * ```
 */
export function primeContainer(
  containerIndex: PrimeContainerIndex
): PrimeContainer {
  return (
    primeContainerSequence(containerIndex)[containerIndex] ??
    throwInvalidPathError("primeContainer")
  );
}

/**
 * use for working with the first n prime containers
 *
 * @example
 * ```typescript
 * primeContainerSequence(2) // [4, 6, 12]
 * ```
 */
export function primeContainerSequence(
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
