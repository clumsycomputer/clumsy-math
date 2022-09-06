import { _getPrimesLessThanInclusive } from "./getPrimesLessThanInclusive";

export function getPrimesRangeInclusive(minNumber: number, maxNumber: number) {
  return _getPrimesRangeInclusive({
    minNumber,
    maxNumber,
  });
}

export interface _GetPrimesInRangeInclusiveApi {
  minNumber: number;
  maxNumber: number;
}

export function _getPrimesRangeInclusive(
  api: _GetPrimesInRangeInclusiveApi
): Array<number> {
  const { minNumber, maxNumber } = api;
  const primesLessThanInclusive = _getPrimesLessThanInclusive({
    maxNumber,
  });
  const minPrimeIndex = primesLessThanInclusive.findIndex(
    (somePrime) => somePrime >= minNumber
  );
  return primesLessThanInclusive.slice(minPrimeIndex);
}
