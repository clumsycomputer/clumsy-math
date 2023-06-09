import { Spacer } from "../spacer";
import { Prime, PrimeContainer, TribeIndex } from "./encoding";
import { primeSequenceInRange } from "./prime";
import { primeContainerSequence } from "./primeContainer";

/**
 * great for working with primes that share bounds and analyzing prime distribution
 *
 * @example
 * ```typescript
 * primeTribe(0) // [5]
 * primeTribe(1) // [7, 11]
 * primeTribe(2) // [13, 17]
 * ```
 */
export function primeTribe(
  tribeIndex: TribeIndex
): [
  tribeLowerBound: PrimeContainer,
  tribeUpperBound: PrimeContainer,
  tribeMembers: Array<Prime>
] {
  const maxContainerSequence = primeContainerSequence(tribeIndex + 1);
  const tribeLowerBound =
    maxContainerSequence[maxContainerSequence.length - 2]!;
  const tribeUpperBound =
    maxContainerSequence[maxContainerSequence.length - 1]!;
  return [
    tribeLowerBound,
    tribeUpperBound,
    primeSequenceInRange(tribeLowerBound, tribeUpperBound),
  ];
}

/**
 * great for analyzing the layout of a prime tribe
 *
 * @example
 * ```typescript
 * tribeSpacer(2) // [6, [0, 4]]
 * tribeSpacer(3) // [12, [0, 4, 10]]
 * tribeSpacer(4) // [12, [0, 6, 10]]
 * ```
 */
export function tribeSpacer(tribeIndex: TribeIndex): Spacer {
  const [tribeLowerBound, tribeUpperBound, tribeMembers] =
    primeTribe(tribeIndex);
  return [
    tribeUpperBound - tribeLowerBound,
    tribeMembers.map(
      (someTribeMember) => someTribeMember - tribeLowerBound - 1
    ),
  ];
}
