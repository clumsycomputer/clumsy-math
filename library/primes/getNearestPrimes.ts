import { _getPrime } from "./getPrime";
import { _getPrimesLessThanInclusive } from "./getPrimesLessThanInclusive";

export function getNearestPrimes(someNumber: number) {
  return _getNearestPrimes({
    someNumber,
  });
}

export interface _GetNearestPrimesApi {
  someNumber: number;
}

export function _getNearestPrimes(
  api: _GetNearestPrimesApi
): [maybeLessThanInclusive: number | null, greaterThanInclusive: number] {
  const { someNumber } = api;
  const lessThanInclusivePrimes = _getPrimesLessThanInclusive({
    maxNumber: someNumber,
  });
  const maybeLessThanInclusivePrime =
    lessThanInclusivePrimes[lessThanInclusivePrimes.length - 1] || null;
  const moreThanPrime =
    maybeLessThanInclusivePrime === someNumber
      ? maybeLessThanInclusivePrime
      : _getPrime({
          primeIndex: lessThanInclusivePrimes.length,
        });
  return [maybeLessThanInclusivePrime, moreThanPrime];
}
