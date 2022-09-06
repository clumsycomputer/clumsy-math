export function getPrimesLessThanInclusive(maxNumber: number) {
  return _getPrimesLessThanInclusive({
    maxNumber,
  });
}

export interface _GetPrimesLessThanInclusiveApi {
  maxNumber: number;
}

export function _getPrimesLessThanInclusive(
  api: _GetPrimesLessThanInclusiveApi
): Array<number> {
  const { maxNumber } = api;
  const nonPrimes = new Set<number>();
  const primesResult: Array<number> = [];
  for (let n = 2; n <= maxNumber; n++) {
    if (!nonPrimes.has(n)) {
      primesResult.push(n);
      let nextNonPrime = Math.pow(n, 2);
      while (nextNonPrime <= maxNumber) {
        nonPrimes.add(nextNonPrime);
        nextNonPrime = nextNonPrime + n;
      }
    }
  }
  return primesResult;
}
