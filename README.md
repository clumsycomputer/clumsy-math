# clumsy-math

a little library of helpful math utensils 🙂

## rhythm _(concepts)_

###### rhythm

> a discrete sequence/cycle of binary values

```typescript
const rhythm = [true, true, false, true, false];
```

###### rhythm slot

> a rhythm's building block

```typescript
const rhythm = [true, true, false, true, false];
const rhythmSlotZero = true; // rhythm[0]
const rhythmSlotTwo = false; // rhythm[2]
```

<sup><i>&emsp;[rhythm](#rhythm)</i></sup>

###### rhythm resolution

> the number of slots that make up a rhythm

```typescript
const rhythm = [true, true, false, true, false];
const rhythmResolution = 5; // rhythm.length
```

<sup><i>&emsp;[rhythm slot](#rhythm-slot)</i></sup>

###### rhythm point

> the index of a slot whose value is true/1

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPoints = [0, 1, 3];
```

<sup><i>&emsp;[rhythm slot](#rhythm-slot)</i></sup>

###### rhythm density

> the number of points in a rhythm

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPoints = [0, 1, 3];
const rhythmDensity = 3; // rhythmPoints.length
```

<sup><i>&emsp;[rhythm point](#rhythm-point)</i></sup>

###### rhythm phase

> an offset measured in slots applied to points relative to a base rhythm

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPhase = -1;
const phasedRhythm = [false, true, true, false, true];
```

<sup><i>&emsp;[rhythm point](#rhythm-point),&emsp;[rhythm slot](#rhythm-slot)</i></sup>

###### rhythm orientation

> the point index relative to a base rhythm that indicates a reoriented rhythm's anchor/starting point

```typescript
const rhythm = [true, true, false, true, false];
const reorientedRhythm = [true, false, true, false, true];
const reorientedRhythmOrientation = 1;
```

###### relative rhythm point

> a point whose value is normalized within the range of [0, 1)

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPoints = [0, 1, 3];
const relativeRhythmPoints = [0, 0.2, 0.6];
```

<sup><i>&emsp;[rhythm point](#rhythm-point),&emsp;[rhythm resolution](#rhythm-resolution)</i></sup>

###### rhythm interval

> the length/distance between two points measured in slots

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPoints = [0, 1, 3];
const rhythmIntervals = [1, 2, 2];
```

<sup><i>&emsp;[rhythm point](#rhythm-point),&emsp;[rhythm slot](#rhythm-slot)</i></sup>

###### rhythm slot weight

> the number/count of points that exist at a slot in the context of a set of rhythms which all have the same resolution

```typescript
const rhythmAaa = [true, true, false, true, false]; // 1, 1, 0, 1, 0
const rhythmBbb = [true, false, true, false, true]; // 1, 0, 1, 0, 1
const rhythmCcc = [true, false, true, true, false]; // 1, 0, 1, 1, 0
const rhythmSlotWeights = [3, 1, 2, 2, 1];
const rhythmSlotWeightZero = 3; // rhythmSlotWeights[0]
```

<sup><i>&emsp;[rhythm slot](#rhythm-slot),&emsp;[rhythm point](#rhythm-point)</i></sup>

###### rhythm point weight

> a point's corresponding slot weight

```typescript
const rhythmAaa = [true, true, false, true, false];
const rhythmBbb = [true, false, true, false, true];
const rhythmCcc = [true, false, true, true, false];
const rhythmSlotWeights = [3, 1, 2, 2, 1];
const rhythmAaaPoints = [0, 1, 3];
const rhythmAaaPointZeroWeight = 3; // rhythmSlotWeights[rhythmAaaPoints[0]]
```

<sup><i>&emsp;[rhythm slot weight](#rhythm-slot-weight),&emsp;[rhythm point](#rhythm-point)</i></sup>

###### rhythm weight

> the sum of a rhythm's point weights

```typescript
const rhythmAaa = [true, true, false, true, false];
const rhythmBbb = [true, false, true, false, true];
const rhythmCcc = [true, false, true, true, false];
const rhythmSlotWeights = [3, 1, 2, 2, 1];
const rhythmAaaPoints = [0, 1, 3];
const rhythmAaaWeight = 6;
```

<sup><i>&emsp;[rhythm point weight](#rhythm-point-weight),&emsp;[rhythm point](#rhythm-point)</i></sup>

###### rhythm group

> a set of recursive euclidean rhythms that share a static base structure and a dynamic member structure where the density structure is the same but orientations are different

```typescript
const groupBaseRhythm = [true, true, false, true, false];
const memberRhythmBase = [true, true, false];
const memberBaseRhythmAaa = [true, true, false]; // memberRhythmBase with orientation 0
const memberBaseRhythmBbb = [true, false, true]; // memberRhythmBase with orientation 1
const groupMemberRhythmAaa = [true, true, false, false, false]; // 11010 -> 110 === 11000
const groupMemberRhythmBbb = [true, false, false, true, false]; // 11010 -> 101 === 10010
```

## rhythm _(classifications)_

###### euclidean rhythm - [white paper](http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf)

> a rhythm who's points are as evenly distributed as possible throughout a discrete space

```typescript
const rhythmAaa = [true, false, true, false];
const rhythmBbb = [true, true, false, true, false];
const rhythmCcc = [true, false, true, false, true];
```

<sup><i>&emsp;[rhythm](#rhythm),&emsp;[rhythm point](#rhythm-point)</i></sup>

###### recursive euclidean rhythm

> a rhythm composed by stacking euclidean rhythms on top of each other where the base rhythm's density/points determines the next rhythm's resolution/space

```typescript
const baseRhythm = [true, true, false, true, false];
const terminalRhythm = [true, false, true];
const resultRhythm = [true, false, false, true, false];
```

<sup><i>&emsp;[euclidean rhythm](#euclidean-rhythm---white-paperhttpcgmcsmcgillcagodfriedpublicationsbanffpdf),&emsp;[rhythm point](#rhythm-point),&emsp;[rhythm resolution](#rhythm-resolution)</i></sup>

###### aligned recursive euclidean rhythm

> a recursive euclidean rhythm where rhythm layers have a phase of zero such that one of it's points remains anchored to the zero slot

```typescript
const baseRhythm = [true, true, false, true, false];
const terminalRhythm = [true, false, true];
const resultRhythm = [true, false, false, true, false];
```

<sup><i>&emsp;[recursive euclidean rhythm](#recursive-euclidean-rhythm),&emsp;[rhythm slot](#rhythm-slot),&emsp;[rhythm phase](#rhythm-phase)</i></sup>

###### phased recursive euclidean rhythm

> a recursive euclidean rhythm where rhythm layers can be phased

```typescript
const baseRhythm = [true, true, false, true, false];
const terminalRhythm = [false, true, true]; // phase === -1
const resultRhythm = [false, true, false, true, false];
```

<sup><i>&emsp;[recursive euclidean rhythm](#recursive-euclidean-rhythm),&emsp;[rhythm phase](#rhythm-phase)</i></sup>

## rhythm _(encodings)_

###### RhythmSlot

> a rhythm slot as _boolean_

```typescript
const rhythmSlot: RhythmSlot = true;
```

<sup><i>&emsp;[rhythm slot](#rhythm-slot)</i></sup>

###### Rhythm

> a rhythm as _Array<[RhythmSlot](#rhythmslot)>_

```typescript
const rhythm: Rhythm = [true, true, false, false, false];
```

<sup><i>&emsp;[rhythm](#rhythm)</i></sup>

###### EuclideanRhythm

> a euclidean rhythm as _[Rhythm](#rhythm-1)_

```typescript
const euclideanRhythm: EuclideanRhythm = [true, true, false, true, false];
```

<sup><i>&emsp;[euclidean rhythm](#euclidean-rhythm---white-paperhttpcgmcsmcgillcagodfriedpublicationsbanffpdf)</i></sup>

###### RecursiveEuclideanRhythm

> a recursive euclidean rhythm as _[Rhythm](#rhythm-1)_

```typescript
const recursiveEuclideanRhythm: RecursiveEuclideanRhythm = [
  true,
  false,
  false,
  true,
  false,
];
```

<sup><i>&emsp;[recursive euclidean rhythm](#recursive-euclidean-rhythm)</i></sup>

###### AlignedRecursiveEuclideanRhythm

> an aligned recursive euclidean rhythm as _[RecursiveEuclideanRhythm](#recursiveeuclideanrhythm)_

```typescript
// AlignedRecursiveEuclideanRhythm === Array<boolean>
```

<sup><i>&emsp;[aligned recursive euclidean rhythm](#aligned-recursive-euclidean-rhythm)</i></sup>

###### PhasedRecursiveEuclideanRhythm

> a phased recursive euclidean rhythm as _[RecursiveEuclideanRhythm](#recursiveeuclideanrhythm)_

```typescript
// PhasedRecursiveEuclideanRhythm === Array<boolean>
```

<sup><i>&emsp;[phased recursive euclidean rhythm](#phased-recursive-euclidean-rhythm)</i></sup>

###### RhythmGroup

> a rhythm group as _Array<[AlignedRecursiveEuclideanRhythm](#alignedrecursiveeuclideanrhythm)>_

<sup><i>&emsp;[rhythm group](#rhythm-group),&emsp;[aligned recursive euclidean rhythm](#aligned-recursive-euclidean-rhythm)</i></sup>

###### RhythmMap

> the defacto encoding for _[Rhythm](#rhythm-1)_

```typescript
const rhythmMap: RhythmMap = {
  rhythmResolution: 5,
  rhythmPoints: [0, 1, 3],
};
```

<sup><i>&emsp;[rhythm resolution](#rhythm-resolution),&emsp;[rhythm point](#rhythm-point)</i></sup>

###### SimpleRhythmStructure

> a minimal encoding for _[EuclideanRhythm](#euclideanrhythm)_

```typescript
const simpleRhythmStructure: SimpleRhythmStructure = {
  rhythmResolution: 5,
  rhythmDensity: 3,
};
```

<sup><i>&emsp;[euclidean rhythm](#euclidean-rhythm---white-paperhttpcgmcsmcgillcagodfriedpublicationsbanffpdf),&emsp;[rhythm resolution](#rhythm-resolution),&emsp;[rhythm density](#rhythm-density)</i></sup>

###### GeneralRhythmStructure

> a generalized encoding for _[EuclideanRhythm](#euclideanrhythm)_

```typescript
const generalRhythmStructure: GeneralRhythmStructure = {
  rhythmResolution: 5,
  rhythmDensity: 3,
  rhythmOrientation: 0,
  rhythmPhase: 0,
};
```

<sup><i>&emsp;[euclidean rhythm](#euclidean-rhythm---white-paperhttpcgmcsmcgillcagodfriedpublicationsbanffpdf),&emsp;[rhythm resolution](#rhythm-resolution),&emsp;[rhythm density](#rhythm-density),&emsp;[rhythm orientation](#rhythm-orientation),&emsp;[rhythm phase](#rhythm-phase)</i></sup>

###### RecursiveRhythmStructure

> the foundational encoding for _[RecursiveEuclideanRhythm](#recursive-euclidean-rhythm)_

<sup><i>&emsp;[recursive euclidean rhythm](#recursive-euclidean-rhythm)</i></sup>

###### AlignedRhythmStructure

> a demonstrative encoding for _[AlignedRecursiveEuclideanRhythm](#alignedrecursiveeuclideanrhythm)_

```typescript
const alignedRhythmStructure: AlignedRhythmStructure = {
  structureType: "initial",
  rhythmResolution: 5,
  subStructure: {
    structureType: "interposed",
    rhythmDensity: 3,
    rhythmOrientation: 0,
    subStructure: {
      structureType: "terminal",
      rhythmDensity: 2,
      rhythmOrientation: 0,
    },
  },
};
```

<sup><i>&emsp;[aligned recursive euclidean rhythm](#aligned-recursive-euclidean-rhythm)</i></sup>

###### PhasedRhythmStructure

> a demonstrative encoding for _[PhasedRecursiveEuclideanRhythm](#phasedrecursiveeuclideanrhythm)_

```typescript
const phasedRhythmStructure: PhasedRhythmStructure = {
  structureType: "initial",
  rhythmResolution: 5,
  rhythmPhase: 0,
  subStructure: {
    structureType: "interposed",
    rhythmDensity: 3,
    rhythmOrientation: 0,
    rhythmPhase: 0,
    subStructure: {
      structureType: "terminal",
      rhythmDensity: 2,
      rhythmOrientation: 0,
    },
  },
};
```

<sup><i>&emsp;[phased recursive euclidean rhythm](#phased-recursive-euclidean-rhythm)</i></sup>

###### StackRhythmStructure

> a generalized more flexible encoding that encompasses both _[AlignedRhythmStructure](#alignedrhythmstructure)_ and _[PhasedRhythmStructure](#phasedrhythmstructure)_ that simplifies computations

```typescript
const stackRhythmStructure: StackRhythmStructure = [
  {
    rhythmResolution: 5,
    rhythmDensity: 3,
    rhythmOrientation: 0,
    rhythmPhase: 0,
  },
  {
    rhythmResolution: 3,
    rhythmDensity: 2,
    rhythmOrientation: 0,
    rhythmPhase: 0,
  },
];
```

<sup><i>&emsp;[aligned recursive euclidean rhythm](#aligned-recursive-euclidean-rhythm),&emsp;[phased recursive euclidean rhythm](#phased-recursive-euclidean-rhythm),&emsp;[GeneralRhythmStructure](#generalrhythmstructure)</i></sup>

###### RhythmGroupStructure

> a compact encoding for _[RhythmGroup](#rhythmgroup)_

```typescript
const rhythmGroupStructure: RhythmGroupStructure = {
  baseStructure: {
    structureType: "initial",
    rhythmResolution: 5,
  },
  memberStructure: {
    structureType: "terminal",
    rhythmDensity: 3,
  },
};
```

<sup><i>&emsp;[rhythm group](#rhythm-group)</i></sup>

## rhythm _(functions)_

#### getSimpleRhythm

> transforms simple rhythm structure to rhythm

```typescript
const simpleRhythm = getSimpleRhythm({
  rhythmResolution: 5,
  rhythmDensity: 3,
});
// simpleRhythm === [true,true,false,true,false]
```

###### getGeneralRhythmStructure

> transforms rhythm structure to general rhythm structure

```typescript
const generalRhythmStructure = getGeneralRhythmStructure({
  structureType: "initial",
  rhythmResolution: 5,
  subStructure: {
    structureType: "interposed",
    rhythmDensity: 3,
    rhythmOrientation: 0,
    subStructure: {
      structureType: "terminal",
      rhythmDensity: 2,
      rhythmOrientation: 0,
    },
  },
});
// generalRhythmStructure ===
//   [
//     {
//       rhythmResolution: 5,
//       rhythmDensity: 3,
//       rhythmOrientation: 0,
//       rhythmPhase: 0,
//     },
//     {
//       rhythmResolution: 3,
//       rhythmDensity: 2,
//       rhythmOrientation: 0,
//       rhythmPhase: 0,
//     },
//   ];
```

###### getPhasedRhythmMap

> computes new _[RhythmMap](#rhythmmap)_ from _[RhythmMap](#rhythmmap)_ and _number_

```typescript
const phasedRhythmMap = getPhasedRhythmMap(
  getRhythmMap({
    structureType: "initial",
    rhythmResolution: 5,
    subStructure: {
      structureType: "terminal",
      rhythmDensity: 3,
      rhythmOrientation: 0,
    },
  }),
  -1
);
// phasedRhythmMap ===
//   {
//     rhythmResolution: 5,
//     rhythmPoints: [1, 2, 4],
//   };
```

###### getRelativeRhythmPoints

> transforms _[RhythmMap](#rhythmmap)_ to _Array<number>_

```typescript
const relativeRhythmPoints = getRelativeRhythmPoints(
  getRhythmMap({
    structureType: "initial",
    rhythmResolution: 5,
    subStructure: {
      structureType: "terminal",
      rhythmDensity: 3,
      rhythmOrientation: 0,
    },
  })
);
// relativeRhythmPoints === [0, 0.2, 0.6];
```

###### getPhasedRhythmComponents

> computes each layer's corresponding from phased rhythm structure

```typescript
const phasedRhythmComponents = getPhasedRhythmComponents({
  structureType: "initial",
  rhythmResolution: 7,
  rhythmPhase: 0,
  subStructure: {
    structureType: "interposed",
    rhythmDensity: 5,
    rhythmOrientation: 0,
    rhythmPhase: 0,
    subStructure: {
      structureType: "terminal",
      rhythmDensity: 3,
      rhythmOrientation: 0,
    },
  },
});
// phasedRhythmComponents ===
//   [
//     {
//       structureType: "initial",
//       rhythmResolution: 7,
//       rhythmPhase: 0,
//       subStructure: {
//         structureType: "terminal",
//         rhythmDensity: 5,
//         rhythmOrientation: 0,
//       },
//     },
//     {
//       structureType: "initial",
//       rhythmResolution: 7,
//       rhythmPhase: 0,
//       subStructure: {
//         structureType: "interposed",
//         rhythmDensity: 5,
//         rhythmOrientation: 0,
//         rhythmPhase: 0,
//         subStructure: {
//           structureType: "terminal",
//           rhythmDensity: 3,
//           rhythmOrientation: 0,
//         },
//       },
//     },
//   ];
```

###### getAlignedRhythmComponents

> computes each layer's corresponding _[AlignedRhythmStructure](#alignedrhythmstructure)_ from _[AlignedRhythmStructure](#alignedrhythmstructure)_

```typescript
const alignedRhythmComponents = getAlignedRhythmComponents({
  structureType: "initial",
  rhythmResolution: 7,
  subStructure: {
    structureType: "interposed",
    rhythmDensity: 5,
    rhythmOrientation: 0,
    subStructure: {
      structureType: "terminal",
      rhythmDensity: 3,
      rhythmOrientation: 0,
    },
  },
});
// alignedRhythmComponents ===
//   [
//     {
//       structureType: "initial",
//       rhythmResolution: 7,
//       subStructure: {
//         structureType: "terminal",
//         rhythmDensity: 5,
//         rhythmOrientation: 0,
//       },
//     },
//     {
//       structureType: "initial",
//       rhythmResolution: 7,
//       subStructure: {
//         structureType: "interposed",
//         rhythmDensity: 5,
//         rhythmOrientation: 0,
//         subStructure: {
//           structureType: "terminal",
//           rhythmDensity: 3,
//           rhythmOrientation: 0,
//         },
//       },
//     },
//   ];
```

###### getRhythmGroupId

> transforms rhythm group structure to unique deterministic string encoding

```typescript
const rhythmGroupId = getRhythmGroupId({
  baseStructure: {
    structureType: "initial",
    rhythmResolution: 5,
  },
  memberStructure: {
    structureType: "terminal",
    rhythmDensity: 3,
  },
});
// rhythmGroupId === "group___5___3";
```

###### getRhythmGroupMembers

> transforms rhythm group structure to aligned rhythm structures

```typescript
const rhythmGroupMembers = getRhythmGroupMembers({
  baseStructure: {
    structureType: "initial",
    rhythmResolution: 5,
  },
  memberStructure: {
    structureType: "terminal",
    rhythmDensity: 3,
  },
});
// rhythmGroupMembers ===
//   [
//     {
//       structureType: "initial",
//       rhythmResolution: 5,
//       subStructure: {
//         structureType: "terminal",
//         rhythmDensity: 3,
//         rhythmOrientation: 0,
//       },
//     },
//     {
//       structureType: "initial",
//       rhythmResolution: 5,
//       subStructure: {
//         structureType: "terminal",
//         rhythmDensity: 3,
//         rhythmOrientation: 1,
//       },
//     },
//     {
//       structureType: "initial",
//       rhythmResolution: 5,
//       subStructure: {
//         structureType: "terminal",
//         rhythmDensity: 3,
//         rhythmOrientation: 2,
//       },
//     },
//   ];
```

###### getAlignedRhythmId

> transforms aligned rhythm structure to unique deterministic string encoding

```typescript
const alignedRhythmId = getAlignedRhythmId({
  structureType: "initial",
  rhythmResolution: 5,
  subStructure: {
    structureType: "terminal",
    rhythmDensity: 3,
    rhythmOrientation: 0,
  },
});
// alignedRhythmId === "aligned__5__3_0"
```

###### getPhasedRhythmId

> transforms phased rhythm structure to unique deterministic string encoding

```typescript
const phasedRhythmId = getPhasedRhythmId({
  structureType: "initial",
  rhythmResolution: 5,
  rhythmPhase: 0,
  subStructure: {
    structureType: "terminal",
    rhythmDensity: 3,
    rhythmOrientation: 0,
  },
});
// phasedRhythmId === "phased__5_0__3_0"
```

###### getRhythmIntervals

> computes point intervals from rhythm map

```typescript
const rhythmIntervals = getRhythmIntervals(
  getRhythmMap({
    structureType: "initial",
    rhythmResolution: 5,
    subStructure: {
      structureType: "terminal",
      rhythmDensity: 3,
      rhythmOrientation: 0,
    },
  })
);
// rhythmIntervals = [1,2,2]
```

###### getRhythmLineage

> computes each layer's corresponding rhythm group structure from aligned rhythm structure

```typescript
const rhythmLineage = getRhythmLineage({
  structureType: "initial",
  rhythmResolution: 7,
  subStructure: {
    structureType: "interposed",
    rhythmDensity: 5,
    rhythmOrientation: 0,
    subStructure: {
      structureType: "terminal",
      rhythmDensity: 3,
      rhythmOrientation: 0,
    },
  },
});
// rhythmLineage ===
//   [
//     {
//       baseStructure: {
//         structureType: "initial",
//         rhythmResolution: 7,
//       },
//       memberStructure: {
//         structureType: "interposed",
//         rhythmDensity: 5,
//         subStructure: {
//           structureType: "terminal",
//           rhythmDensity: 3,
//         },
//       },
//     },
//     {
//       baseStructure: {
//         structureType: "initial",
//         rhythmResolution: 7,
//         subStructure: {
//           structureType: "interposed",
//           rhythmDensity: 5,
//           rhythmOrientation: 0,
//         },
//       },
//       memberStructure: {
//         structureType: "terminal",
//         rhythmDensity: 3,
//       },
//     },
//   ];
```

###### getRhythmMap

> computes rhythm map from rhythm structure

```typescript
const rhythmMap = getRhythmMap({
  structureType: 'initial',
  rhythmResolution: 5,
  subStructure: {
    structureType: 'terminal'
    rhythmDensity: 3,
    rhythmOrientation: 0
  }
})
// rhythmMap === {
//   rhythmResolution: 5,
//   rhythmPoints: [0,1,3]
// }
```

###### getRhythmPointWeights

> computes point weights from rhythm map and slot weights

```typescript
const rhythmGroupMemberRhythmMaps = getRhythmGroupMembers({
  baseStructure: {
    structureType: "initial",
    rhythmResolution: 5,
  },
  memberStructure: {
    structureType: "terminal",
    rhythmDensity: 3,
  },
}).map(getRhythmMap);

const rhythmPointWeights = getRhythmPointWeights(
  rhythmGroupMemberRhythmMaps[0],
  getRhythmSlotWeights(rhythmGroupMemberRhythmMaps)
);
// rhythmPointWeights === [3, 1, 2];
```

###### getRhythmSlotWeights

> computes slot weights from rhythm maps

```typescript
const rhythmSlotWeights = getRhythmSlotWeights(
  getRhythmGroupMembers({
    baseStructure: {
      structureType: "initial",
      rhythmResolution: 5,
    },
    memberStructure: {
      structureType: "terminal",
      density: 3,
    },
  }).map(getRhythmMap)
);
// rhythmSlotWeights === [3, 1, 2, 2, 1];
```

###### getRhythmString

> transforms rhythm map to binary string

```typescript
const rhythmString = getRhythmString(
  getRhythmMap({
    structureType: "initial",
    rhythmResolution: 5,
    subStructure: {
      structureType: "terminal",
      rhythmDensity: 3,
      rhythmOrientation: 0,
    },
  })
);
// rhythmString === "11010"
```

###### getRhythmWeight

> computes rhythm weight from rhythm map and slot weights

```typescript
const rhythmGroupMemberRhythmMaps = getRhythmGroupMembers({
  baseStructure: {
    structureType: "initial",
    rhythmResolution: 5,
  },
  memberStructure: {
    structureType: "terminal",
    rhythmDensity: 3,
  },
}).map(getRhythmMap);

const rhythmWeight = getRhythmWeight(
  rhythmGroupMemberRhythmMaps[0],
  getRhythmSlotWeights(rhythmGroupMemberRhythmMaps)
);
// rhythmWeight === 6
```

## primes _(functions)_

###### getNearestPrimes

> computes the nearest prime below and above given number

```typescript
const nearestPrimes = getNearestPrimes(10);
// nearestPrimes === [7, 11]
```

###### getNumberGreaterThanPrime

> computes a number greater than the prime of given prime index

```typescript
const numberGreaterThan7 = getNumberGreaterThanPrime(3);
// numberGreaterThan7 === 8
```

###### getPrime

> computes prime of given prime index

```typescript
const prime = getPrime(3);
// prime === 7
```

###### getPrimeContainer

> computes prime container of given prime container index

```typescript
const primeContainer = getPrimeContainer(2);
// primeContainer === 12
```

###### getPrimeContainers

> computes prime containers up to given prime container index

```typescript
const primeContainers = getPrimeContainers(2);
// primeContainers = [4, 6, 12]
```

###### getPrimes

> computes primes up to given prime index

```typescript
const primes = getPrimes(3);
// primes === [2, 3, 5, 7]
```

###### getPrimesRangeInclusive

> computes primes contained within given minimum number and maximum number

```typescript
const primesRange = getPrimesRangeInclusive(4, 11);
// primesRange === [5, 7, 11]
```

###### getPrimesLessThanInclusive

> computes primes less than or equal to given number

```typescript
const primesLessThan12 = getPrimesLessThanInclusive(12);
// primesLessThan12 = [2, 3, 5, 7, 11]
```

###### getPrimesSlice

> computes primes from given minimum prime index to given maximum prime index

```typescript
const primesSlice = getPrimesSlice(3, 5);
// primesSlice === [7, 11, 13]
```

###### isPrime

> checks if given number is prime

```typescript
const isFourPrime = isPrime(4);
// isFourPrime === false
```

###### isPrimeContainer

> checks if given number is prime container

```typescript
const isFourPrimeContainer = isPrimeContainer(4);
// isFourPrimeContainer === true
```

## general _(models)_

###### RecursiveSpatialStructure

>

```typescript

```
