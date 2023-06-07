import { Spacer, SpacerSlotWeight, SpacerWeight } from "./encodings";

/**
 * great for understanding point distribution across a set of spacers
 *
 * @example
 * ```typescript
 * const slotWeightsA = spacerSlotWeights([
 *   spacer([5, [3, 0]]),
 *   spacer([5, [3, 1]]),
 *   spacer([5, [3, 2]])
 * ])
 * // slotWeightsA === [3, 1, 2, 2, 1]
 * ```
 */
export function spacerSlotWeights(
  someSpacers: [Spacer, ...Array<Spacer>]
): Array<SpacerSlotWeight> {
  const resultSlotWeights = new Array(someSpacers[0][0]).fill(0);
  for (const currentSpacer of someSpacers) {
    for (const currentPoint of currentSpacer[1]) {
      resultSlotWeights[currentPoint] += 1;
    }
  }
  return resultSlotWeights;
}

/**
 * great for working with a spacer's points in the context of a set of spacers
 *
 * @example
 * ```typescript
 * const pointWeightsA = spacerPointWeights(
 *   spacerSlotWeights([
 *     spacer([5, [3, 0]]),
 *     spacer([5, [3, 1]]),
 *     spacer([5, [3, 2]])
 *   ]),
 *   spacer([5, [3, 2]])
 * )
 * // const pointWeightsA === [3, 2, 2]
 * ```
 */
export function spacerPointWeights(
  baseSlotWeights: Array<SpacerSlotWeight>,
  memberSpacer: Spacer
): Array<SpacerSlotWeight> {
  return memberSpacer[1].map(
    (currentMemberPoint) => baseSlotWeights[currentMemberPoint]!
  );
}

/**
 * great for differentiating a spacer against a set of spacers
 *
 * @example
 * ```typescript
 * const weightA = spacerWeight(
 *   spacerSlotWeights([
 *     spacer([5, [3, 0]]),
 *     spacer([5, [3, 1]]),
 *     spacer([5, [3, 2]])
 *   ]),
 *   spacer([5, [3, 2]])
 * )
 * // const weightA === 7
 * ```
 */
export function spacerWeight(
  baseSlotWeights: Array<number>,
  memberSpacer: Spacer
): SpacerWeight {
  return memberSpacer[1].reduce(
    (resultWeight, currentMemberPoint) =>
      resultWeight + baseSlotWeights[currentMemberPoint]!,
    0
  );
}
