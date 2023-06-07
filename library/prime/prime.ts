import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import { Natural, Prime, PrimeIndex } from "./encoding";

/**
 * use for getting prime by index
 *
 * @example
 * ```typescript
 * const primeA = prime(0) // 2
 * const primeB = prime(1) // 3
 * const primeC = prime(2) // 5
 * ```
 */
export function prime(primeIndex: PrimeIndex): Prime {
  return (
    primeSequence(primeIndex)[primeIndex] ?? throwInvalidPathError("prime")
  );
}

/**
 * use for working with the first n primes
 *
 * @example
 * ```typescript
 * const sequenceA = primeSeqeunce(2)
 * // sequenceA === [2, 3, 5]
 * ```
 */
export function primeSequence(maxPrimeIndex: PrimeIndex): Array<Prime> {
  return primeSequenceInclusive(numberGreaterThanPrime(maxPrimeIndex));
}

/**
 * use for getting all primes less than some number
 *
 * @example
 * ```typescript
 * const sequenceA = primeSequenceInclusive(6)
 * // sequenceA === [2, 3, 5]
 * ```
 */
export function primeSequenceInclusive(maxNumber: Natural): Array<Prime> {
  const nonPrimes = new Set<Prime>();
  const resultPrimes: Array<Prime> = [];
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
 * helpful for quickly determing the approximate size of a prime
 *
 * @example
 * ```typescript
 * const numberA = numberGreaterThanPrime(2)
 * // numberA === 6
 * ```
 */
function numberGreaterThanPrime(primeIndex: PrimeIndex): Natural {
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
