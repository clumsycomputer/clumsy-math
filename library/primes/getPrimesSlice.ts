import { _getPrimes, _GetPrimesApi } from "./getPrimes";

export function getPrimesSlice(minPrimeIndex: number, maxPrimeIndex: number) {
  return _getPrimesSlice({
    minPrimeIndex,
    maxPrimeIndex,
  });
}

export interface _GetPrimesSliceApi
  extends Pick<_GetPrimesApi, "maxPrimeIndex"> {
  minPrimeIndex: number;
}

export function _getPrimesSlice(api: _GetPrimesSliceApi): Array<number> {
  const { maxPrimeIndex, minPrimeIndex } = api;
  return _getPrimes({
    maxPrimeIndex,
  }).slice(minPrimeIndex);
}
