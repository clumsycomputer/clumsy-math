import { Natural } from "./encoding";

/**
 * use for checking if some number is a prime container
 *
 * @example
 * ```typescript
 * isPrimeContainer(4) // true
 * isPrimeContainer(5) // false
 * ```
 */
export function isPrimeContainer(someNumber: Natural): boolean {
  return isPrime(someNumber - 1) && isPrime(someNumber + 1);
}

/**
 * use for checking if some number is prime
 *
 * @example
 * ```typescript
 * isPrime(4) // false
 * isPrime(5) // true
 * ```
 */
export function isPrime(someNumber: Natural): boolean {
  for (let n = 2; n <= Math.sqrt(someNumber); n++) {
    if (someNumber % n === 0) {
      return false;
    }
  }
  return someNumber > 1;
}
