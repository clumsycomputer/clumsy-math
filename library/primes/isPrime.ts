// https://stackoverflow.com/a/40200710

export function isPrime(someNumber: number) {
  return _isPrime({
    someNumber,
  });
}

export interface _IsPrimeApi {
  someNumber: number;
}

export function _isPrime(api: _IsPrimeApi): boolean {
  const { someNumber } = api;
  for (let n = 2; n <= Math.sqrt(someNumber); n++) {
    if (someNumber % n === 0) {
      return false;
    }
  }
  return someNumber > 1;
}
