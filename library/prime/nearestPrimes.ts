import { Prime } from "./encoding";
import { prime, primeNumberingIncluding } from "./prime";

export function nearestPrimes(
  someNumber: number
): [maybePrimeLessThanIncluding: Prime | null, primeMoreThanIncluding: Prime] {
  const currentPrimeNumbering = primeNumberingIncluding(someNumber);
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
