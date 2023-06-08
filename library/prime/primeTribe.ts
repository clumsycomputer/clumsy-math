import { Prime, TribeIndex } from "./encoding";
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
export function primeTribe(tribeIndex: TribeIndex): Array<Prime> {
  const maxContainerSequence = primeContainerSequence(tribeIndex + 1);
  const startContainer = maxContainerSequence[maxContainerSequence.length - 2]!;
  const endContainer = maxContainerSequence[maxContainerSequence.length - 1]!;
  return primeSequenceInRange(startContainer, endContainer);
}
