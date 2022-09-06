import { _getNumberGreaterThanPrime } from "./getNumberGreaterThanPrime";
import { _getPrimesLessThanInclusive } from "./getPrimesLessThanInclusive";

export function getPrimes(maxPrimeIndex: number) {
  return _getPrimes({
    maxPrimeIndex,
  });
}

export interface _GetPrimesApi {
  maxPrimeIndex: number;
}

export function _getPrimes(api: _GetPrimesApi): Array<number> {
  const { maxPrimeIndex } = api;
  return _getPrimesLessThanInclusive({
    maxNumber: _getNumberGreaterThanPrime({
      primeIndex: maxPrimeIndex,
    }),
  });
}
