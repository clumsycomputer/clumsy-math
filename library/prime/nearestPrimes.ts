import { Prime } from "./encoding";
import { prime, primeNumberingInclusive } from "./prime";

export function nearestPrimes(
  someNumber: number
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
