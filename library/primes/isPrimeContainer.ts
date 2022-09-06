import { _isPrime } from "./isPrime";

export function isPrimeContainer(someNumber: number) {
  return _isPrimeContainer({
    someNumber,
  });
}

export interface _IsPrimeContainerApi {
  someNumber: number;
}

export function _isPrimeContainer(api: _IsPrimeContainerApi): boolean {
  const { someNumber } = api;
  return (
    _isPrime({
      someNumber: someNumber - 1,
    }) &&
    _isPrime({
      someNumber: someNumber + 1,
    })
  );
}
