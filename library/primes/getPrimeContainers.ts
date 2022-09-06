import { _isPrimeContainer } from "./isPrimeContainer";

export function getPrimeContainers(maxContainerIndex: number) {
  return _getPrimeContainers({
    maxContainerIndex,
  });
}

export interface _GetPrimeContainersApi {
  maxContainerIndex: number;
}

export function _getPrimeContainers(
  api: _GetPrimeContainersApi
): Array<number> {
  const { maxContainerIndex } = api;
  const primeContainers: Array<number> = [];
  let n = 4;
  while (primeContainers.length < maxContainerIndex + 1) {
    if (
      _isPrimeContainer({
        someNumber: n,
      })
    ) {
      primeContainers.push(n);
    }
    n = n + 1;
  }
  return primeContainers;
}
