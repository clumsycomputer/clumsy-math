import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import { Prime, PrimeIndex } from "./encoding";

/**
 * great for getting prime by index
 */
export function prime(primeIndex: PrimeIndex): Prime {
  return (
    primeNumbering(primeIndex)[primeIndex] ?? throwInvalidPathError("prime")
  );
}

/**
 * great for working with n primes
 */
export function primeNumbering(maxPrimeIndex: PrimeIndex): Array<Prime> {
  return primeNumberingInclusive(numberGreaterThanPrime(maxPrimeIndex));
}

/**
 * great for getting all primes less than some number
 */
export function primeNumberingInclusive(maxNumber: number): Array<Prime> {
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

/**
 * helpful for determining the approximate size of prime at prime index
 */
function numberGreaterThanPrime(primeIndex: PrimeIndex): number {
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
