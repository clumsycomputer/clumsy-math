import { _getPrimes } from "./getPrimes";

export function getPrime(primeIndex: number) {
  return _getPrime({
    primeIndex,
  });
}

export interface _GetPrimeApi {
  primeIndex: number;
}

export function _getPrime(api: _GetPrimeApi): number {
  const { primeIndex } = api;
  return _getPrimes({
    maxPrimeIndex: primeIndex,
  })[primeIndex]!;
}
