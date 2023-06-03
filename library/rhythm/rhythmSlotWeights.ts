import { Rhythm, RhythmSlotWeight, RhythmWeight } from "./encodings";

/**
 * great for understanding point distribution across a set of rhythms
 *
 * @example
 * ```typescript
 * const slotWeightsA = rhythmSlotWeights([
 *   rhythm([5, [3, 0]]),
 *   rhythm([5, [3, 1]]),
 *   rhythm([5, [3, 2]])
 * ])
 * // slotWeightsA === [3, 1, 2, 2, 1]
 * ```
 */
export function rhythmSlotWeights(
  someRhythms: [Rhythm, ...Array<Rhythm>]
): Array<RhythmSlotWeight> {
  const resultSlotWeights = new Array(someRhythms[0].resolution).fill(0);
  for (const currentRhythm of someRhythms) {
    for (const currentPoint of currentRhythm.points) {
      resultSlotWeights[currentPoint] += 1;
    }
  }
  return resultSlotWeights;
}

/**
 * great for working with a rhythm's points in the context of a set of rhythms
 *
 * @example
 * ```typescript
 * const pointWeightsA = rhythmPointWeights(
 *   rhythmSlotWeights([
 *     rhythm([5, [3, 0]]),
 *     rhythm([5, [3, 1]]),
 *     rhythm([5, [3, 2]])
 *   ]),
 *   rhythm([5, [3, 2]])
 * )
 * // const pointWeightsA === [3, 2, 2]
 * ```
 */
export function rhythmPointWeights(
  baseSlotWeights: Array<RhythmSlotWeight>,
  memberRhythm: Rhythm
): Array<RhythmSlotWeight> {
  return memberRhythm.points.map(
    (currentMemberPoint) => baseSlotWeights[currentMemberPoint]!
  );
}

/**
 * great for differentiating a rhythm against a set of rhythms
 *
 * @example
 * ```typescript
 * const weightA = rhythmWeight(
 *   rhythmSlotWeights([
 *     rhythm([5, [3, 0]]),
 *     rhythm([5, [3, 1]]),
 *     rhythm([5, [3, 2]])
 *   ]),
 *   rhythm([5, [3, 2]])
 * )
 * // const weightA === 7
 * ```
 */
export function rhythmWeight(
  baseSlotWeights: Array<number>,
  memberRhythm: Rhythm
): RhythmWeight {
  return memberRhythm.points.reduce(
    (resultWeight, currentMemberPoint) =>
      resultWeight + baseSlotWeights[currentMemberPoint]!,
    0
  );
}
