export function euclidRhythm(
  resolution: number,
  density: number
): Array<boolean> {
  const coreRhythm = coreEuclidRhythm(resolution, density);
  const wholeRhythm: Array<boolean> = [];
  for (let slotIndex = 0; slotIndex < resolution; slotIndex++) {
    wholeRhythm.push(coreRhythm[slotIndex % coreRhythm.length]!);
  }
  return wholeRhythm;
}

export function coreEuclidRhythm(
  resolution: number,
  density: number
): Array<boolean> {
  let lhsCount = density;
  let rhsCount = resolution - density;
  let lhsRhythm: Array<boolean> = [true];
  let rhsRhythm: Array<boolean> = [false];
  while (rhsCount > 0) {
    if (lhsCount > rhsCount) {
      lhsCount = lhsCount - rhsCount;
      rhsRhythm = [...lhsRhythm, ...rhsRhythm];
    } else {
      rhsCount = rhsCount - lhsCount;
      lhsRhythm = [...lhsRhythm, ...rhsRhythm];
    }
  }
  return lhsRhythm;
}
