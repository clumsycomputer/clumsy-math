import { _getPrimeContainers } from "./getPrimeContainers";

export function getPrimeContainer(containerIndex: number) {
  return _getPrimeContainer({
    containerIndex,
  });
}

export interface _GetPrimeContainerApi {
  containerIndex: number;
}

export function _getPrimeContainer(api: _GetPrimeContainerApi): number {
  const { containerIndex } = api;
  return _getPrimeContainers({
    maxContainerIndex: containerIndex,
  })[containerIndex]!;
}
