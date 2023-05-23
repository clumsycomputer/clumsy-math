import { Rhythm } from "./encodings";

export function rhythmSlotWeights(
  someRhythms: [Rhythm, ...Array<Rhythm>]
): Array<number> {
  const resultSlotWeights = new Array(someRhythms[0].resolution).fill(0);
  for (const currentRhythm of someRhythms) {
    for (const currentPoint of currentRhythm.points) {
      resultSlotWeights[currentPoint] += 1;
    }
  }
  return resultSlotWeights;
}

export function rhythmPointWeights(
  baseSlotWeights: Array<number>,
  memberRhythm: Rhythm
): Array<number> {
  return memberRhythm.points.map(
    (currentMemberPoint) => baseSlotWeights[currentMemberPoint]!
  );
}

export function rhythmWeight(
  baseSlotWeights: Array<number>,
  memberRhythm: Rhythm
): number {
  return memberRhythm.points.reduce(
    (resultWeight, currentMemberPoint) =>
      resultWeight + baseSlotWeights[currentMemberPoint]!,
    0
  );
}
