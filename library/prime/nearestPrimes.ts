import { Natural, Prime } from "./encoding";
import { prime, primeSequenceInclusive } from "./prime";

/**
 * great for rounding some number to nearest prime
 */
export function nearestPrimes(
  someNumber: Natural
): [maybePrimeLessThanInclusive: Prime | null, primeMoreThanInclusive: Prime] {
  const currentPrimeSequence = primeSequenceInclusive(someNumber);
  const maybePrimeLessThanIndex = currentPrimeSequence.length - 1;
  const maybePrimeLessThanIncluding =
    currentPrimeSequence[maybePrimeLessThanIndex] ?? null;
  return [
    maybePrimeLessThanIncluding,
    someNumber === maybePrimeLessThanIncluding
      ? maybePrimeLessThanIncluding
      : prime(maybePrimeLessThanIndex + 1),
  ];
}
