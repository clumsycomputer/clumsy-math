import { throwInvalidPathError } from "../utilities/throwInvalidPathError";

export function prime(primeIndex: number): number {
  return (
    primeNumbering(primeIndex)[primeIndex] ?? throwInvalidPathError("prime")
  );
}

export function primeNumbering(maxPrimeIndex: number): Array<number> {
  return primeNumberingIncluding(numberGreaterThanPrime(maxPrimeIndex));
}

export function primeNumberingIncluding(maxNumber: number): Array<number> {
  const nonPrimes = new Set<number>();
  const resultPrimes: Array<number> = [];
  for (let n = 2; n <= maxNumber; n++) {
    if (!nonPrimes.has(n)) {
      resultPrimes.push(n);
      let nextNonPrime = Math.pow(n, 2);
      while (nextNonPrime <= maxNumber) {
        nonPrimes.add(nextNonPrime);
        nextNonPrime = nextNonPrime + n;
      }
    }
  }
  return resultPrimes;
}

function numberGreaterThanPrime(primeIndex: number): number {
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
