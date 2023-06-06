import { Natural, Prime } from "./encoding";
import { prime, primeNumberingInclusive } from "./prime";

/**
 * great for rounding some number to a prime
 */
export function nearestPrimes(
  someNumber: Natural
): [maybePrimeLessThanInclusive: Prime | null, primeMoreThanInclusive: Prime] {
  const currentPrimeNumbering = primeNumberingInclusive(someNumber);
  const maybePrimeLessThanIndex = currentPrimeNumbering.length - 1;
  const maybePrimeLessThanIncluding =
    currentPrimeNumbering[maybePrimeLessThanIndex] ?? null;
  return [
    maybePrimeLessThanIncluding,
    someNumber === maybePrimeLessThanIncluding
      ? maybePrimeLessThanIncluding
      : prime(maybePrimeLessThanIndex + 1),
  ];
}
