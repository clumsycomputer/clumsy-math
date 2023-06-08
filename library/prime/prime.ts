import { throwInvalidPathError } from "../utilities/throwInvalidPathError";
import { Natural, Prime, PrimeIndex } from "./encoding";

/**
 * use for getting prime by index
 *
 * @example
 * ```typescript
 * prime(0) // 2
 * prime(1) // 3
 * prime(2) // 5
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
 * primeSeqeunce(2) // [2, 3, 5]
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
 * primeSequenceInclusive(6) // [2, 3, 5]
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
 * numberGreaterThanPrime(2) // 6
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

/**
 * great for working with primes between containers
 *
 * @example
 * ```typescript
 * primeSequenceInRange(12, 18) // [13, 17]
 * ```
 */
export function primeSequenceInRange(
  minNumber: Natural,
  maxNumber: Natural
): Array<Prime> {
  const maxNumberSequence = primeSequenceInclusive(maxNumber);
  const minNumberIndex = maxNumberSequence.findIndex(
    (somePrime) => somePrime >= minNumber
  );
  return maxNumberSequence.slice(minNumberIndex);
}
