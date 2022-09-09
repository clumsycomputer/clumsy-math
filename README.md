# clumsy-math

a little library of helpful math utensils 🙂

## rhythm _(concepts)_

###### rhythm

> a discrete sequence/cycle of binary values

```typescript
const basicRhythm: Rhythm = [true, true, false, true, false];
```

###### rhythm slot

> the building block of rhythm

```typescript
const basicRhythm: Rhythm = [true, true, false, true, false];
const basicRhythmSlotZero = true; // basicRhythm[0]
const basicRhythmSlotTwo = false; // basicRhythm[2]
```

###### rhythm point

> the index of a slot whose value is true/1

```typescript
const basicRhythm: Rhythm = [true, true, false, true, false];
const basicRhythmPoints = [0, 1, 3];
```

###### rhythm resolution

> the number of slots that make up a rhythm

```typescript
const basicRhythm: Rhythm = [true, true, false, true, false];
const basicRhythmResolution = 5; // basicRhythm.length
```

###### rhythm density

> the number of points in a rhythm

```typescript
const basicRhythm: Rhythm = [true, true, false, true, false];
const basicRhythmPoints = [0, 1, 3];
const basicRhythmDensity = 3; // basicRhythmPoints.length
```

###### rhythm phase

> an offset of points relative to a base rhythm

```typescript
const basicRhythm: Rhythm = [true, true, false, true, false];
const basicRhythmPhase = -1;
const phasedBasicRhythm = [false, true, true, false, true];
```

###### rhythm orientation

> the point index relative to a base rhythm that indicates an adjusted rhythm's anchor/starting point

```typescript
const basicRhythm: Rhythm = [true, true, false, true, false];
const basicRhythmOrientation = 1;
const reorientedBasicRhythm = [true, false, true, false, true];
```

###### relative rhythm point

> a point whose value is normalized within the range of [0, 1)

```typescript
const basicRhythm: Rhythm = [true, true, false, true, false];
const basicRhythmPoints = [0, 1, 3];
const relativeBasicRhythmPoints = [0, 0.2, 0.6];
```

###### rhythm interval

> the length/distance between two points measured in slots

```typescript
const basicRhythm: Rhythm = [true, true, false, true, false];
const basicRhythmPoints = [0, 1, 3];
const basicRhythmIntervals = [1, 2, 2];
```

###### rhythm slot weight

> the number/count of points that exist at a slot in the context of a set of rhythms which all have the same resolution

```typescript
const basicRhythmZero: Rhythm = [true, true, false, true, false]; // 1, 1, 0, 1, 0
const basicRhythmOne: Rhythm = [true, false, true, false, true]; // 1, 0, 1, 0, 1
const basicRhythmTwo: Rhythm = [true, false, true, true, false]; // 1, 0, 1, 1, 0
const basicRhythmSlotWeights = [3, 1, 2, 2, 1];
const basicRhythmSlotWeightZero = 3; // basicRhythmSlotWeights[0]
```

###### rhythm point weight

> a point's corresponding slot weight

```typescript
const basicRhythmZero: Rhythm = [true, true, false, true, false];
const basicRhythmOne: Rhythm = [true, false, true, false, true];
const basicRhythmTwo: Rhythm = [true, false, true, true, false];
const basicRhythmSlotWeights = [3, 1, 2, 2, 1];
const basicRhythmZeroPoints = [0, 1, 3];
const basicRhythmZeroPointsPointTwoWeight = 2; // basicRhythmSlotWeights[basicRhythmPointsZero[2]]
```

###### rhythm weight

> the sum of a rhythm's point weights

```typescript
const basicRhythmZero: Rhythm = [true, true, false, true, false];
const basicRhythmOne: Rhythm = [true, false, true, false, true];
const basicRhythmTwo: Rhythm = [true, false, true, true, false];
const basicRhythmSlotWeights = [3, 1, 2, 2, 1];
const basicRhythmZeroPoints = [0, 1, 3];
const basicRhythmZeroWeight = 6;
```

## rhythm _(classifications)_

###### euclidean rhythm - [white paper](http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf)

###### recursive euclidean rhythm

## rhythm _(encodings)_

###### Rhythm

> rhythm as an array of booleans

```typescript

```

###### RhythmMap

> the defacto encoding for _[Rhythm](#rhythm)_

```typescript
const rhythmMap: RhythmMap = {
  rhythmResolution: 5,
  rhythmPoints: [0, 1, 3],
};
```

###### RhythmStructure

> an extendable _[RecursiveSpatialStructure](#recursivespatialstructure)_ that encodes the concept of layered euclidean rhythms and serves as the foundation for both _[AlignedRhythmStructure](#alignedrhythmstructure)_ and _[PhasedRhythmStructure](#phasedrhythmstructure)_

###### AlignedRhythmStructure

> mostly an alias for _[RhythmStructure](#rhythmstructure)_ which serves to highlight the difference between itself and _[PhasedRhythmStructure](#phasedrhythmstructure)_

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

###### PhasedRhythmStructure

> a _[RhythmStructure](#rhythmstructure)_ with the additional concept of layers being phased

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

###### GeneralRhythmStructure

> a generalized more flexible encoding that encompasses _[AlignedRhythmStructure](#alignedrhythmstructure)_ and _[PhasedRhythmStructure](#phasedrhythmstructure)_ for simplifying computations

```typescript
const generalRhythmStructure: GeneralRhythmStructure = [
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

###### BasicRhythmStructure

> a generalized encoding for _[EuclideanRhythm](#euclideanrhythm---white-paperhttpcgmcsmcgillcagodfriedpublicationsbanffpdf)_

```typescript
const basicRhythmStructure: BasicRhythmStructure = {
  rhythmResolution: 5,
  rhythmDensity: 3,
  rhythmOrientation: 0,
  rhythmPhase: 0,
};
```

###### EuclideanRhythmStructure

> a minimal encoding for _[EuclideanRhythm](#euclideanrhythm---white-paperhttpcgmcsmcgillcagodfriedpublicationsbanffpdf)_

```typescript
const euclideanRhythm: EuclideanRhythmStructure = {
  rhythmResolution: 5,
  rhythmDensity: 3,
};
```

###### RhythmGroupStructure

> a compact encoding for a set of related _[AlignedRhythmStructure](#alignedrhythmstructure)s_

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

###### RhythmGroupBaseStructure

> the invariant portion of _[RhythmGroupStructure](#rhythmgroupstructure)_

```typescript
const rhythmGroupBaseStructure: RhythmGroupBaseStructure = {
  structureType: "initial",
  rhythmResolution: 5,
};
```

###### RhythmGroupMemberStructure

> the variant portion of _[RhythmGroupStructure](#rhythmgroupstructure)_

```typescript
const rhythmGroupMemberStructure: RhythmGroupMemberStructure = {
  structureType: "terminal",
  rhythmDensity: 3,
};
```

## rhythm _(functions)_

#### getEuclideanRhythm

> computes the euclidean _[Rhythm](#rhythm)_ of given _[EuclideanRhythmStructure](#euclideanrhythmstructure)_

```typescript
const euclideanRhythm = getEuclideanRhythm({
  rhythmResolution: 5,
  rhythmDensity: 3,
});
// euclideanRhythm === [true,true,false,true,false]
```

###### getGeneralRhythmStructure

> computes the _[GeneralRhythmStructure](#generalrhythmstructure)_ of given _[RhythmStructure](#rhythmstructure)_

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

> transforms rhythm points of given _[RhythmMap](#rhythmmap)_ by given _[RhythmPhase](#rhythmphase)_

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

> normalizes _[RhythmPoint](#rhythmpoint)s_ to values within 0 and 1 of given _[RhythmMap](#rhythmmap)_

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

> computes each layers corresponding _[PhasedRhythmStructure](#phasedrhythmstructure)_ of given _[PhasedRhythmStructure](#phasedrhythmstructure)_

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

> computes each layers corresponding _[AlignedRhythmStructure](#alignedrhythmstructure)_ of given _[AlignedRhythmStructure](#alignedrhythmstructure)_

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

> computes the deterministic string encoding of given _[RhythmGroupStructure](#rhythmgroupstructure)_

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

> computes all _[AlignedRhythmStructure](#alignedrhythmstructure)_ of given _[RhythmGroupStructure](#rhythmgroupstructure)_

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

> computes the deterministic string encoding of given _[AlignedRhythmStructure](#alignedrhythmstructure)_

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

> computes the deterministic string encoding of given _[PhasedRhythmStructure](#phasedrhythmstructure)_

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

> computes the length between _[RhythmPoint](#rhythmpoint)s_ of given _[RhythmMap](#rhythmmap)_

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

> computes each layer's corresponding _[RhythmGroupStructure](#rhythmgroupstructure)_ of given _[AlignedRhythmStructure](#alignedrhythmstructure)_

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

> computes the _[RhythmMap](#rhythmmap)_ of given _[RhythmStructure](#rhythmstructure)_

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

> maps _[RhythmPoint](#rhythmpoint)s_ of given _[RhythmMap](#rhythmmap)_ to corresponding _[RhythmSlot](#rhythmslot)_ weights

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

> computes the weight / count of rhythm point distribution across the slots of given rhythm group members

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

> transforms a _[RhythmMap](#rhythmmap)_ into a string of 1s and 0s

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

> computes the rhythm point weight sum of given _[RhythmMap](#rhythmmap)_ with corresponding slot weights

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
