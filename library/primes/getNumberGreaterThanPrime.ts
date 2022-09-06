export function getNumberGreaterThanPrime(primeIndex: number) {
  return _getNumberGreaterThanPrime({
    primeIndex,
  });
}

export interface _GetNumberGreaterThanPrimeApi {
  primeIndex: number;
}

export function _getNumberGreaterThanPrime(
  api: _GetNumberGreaterThanPrimeApi
): number {
  const { primeIndex } = api;
  if (primeIndex === 0) {
    return 2 + 1;
  } else if (primeIndex === 1) {
    return 3 + 1;
  } else if (primeIndex === 2) {
    return 5 + 1;
  } else if (primeIndex === 3) {
    return 7 + 1;
  } else if (primeIndex === 4) {
    return 11 + 1;
  } else {
    const adjustedPrimeIndex = primeIndex + 1;
    return Math.floor(
      adjustedPrimeIndex * Math.log(adjustedPrimeIndex) +
        adjustedPrimeIndex * Math.log(Math.log(adjustedPrimeIndex))
    );
  }
}
