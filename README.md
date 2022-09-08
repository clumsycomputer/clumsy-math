# clumsy-math

a little library of helpful math utensils 🙂

## rhythm _(models)_

###### Rhythm

> the concept of rhythm as a discrete sequence / cycle of booleans

```typescript
const rhythm: Rhythm = [true, false, true, false];
```

###### RhythmMap

> the defacto encoding for [_Rhythm_](#rhythm)

```typescript
const rhythmMap: RhythmMap = {
  rhythmResolution: 5,
  rhythmPoints: [0, 1, 3],
};
```

###### RhythmStructure

> an extendable [_RecursiveSpatialStructure_](#recursivespatialstructure) that encodes the concept of layered euclidean rhythms and serves as the foundation for both [_AlignedRhythmStructure_](#alignedrhythmstructure) and [_PhasedRhythmStructure_](#phasedrhythmstructure)

###### AlignedRhythmStructure

> mostly an alias for [_RhythmStructure_](#rhythmstructure) which serves to highlight the difference between itself and [_PhasedRhythmStructure_](#phasedrhythmstructure)

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

> a [_RhythmStructure_](#rhythmstructure) with the additional concept of layers being phased

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

> a generalized more flexible encoding that encompasses [_AlignedRhythmStructure_](#alignedrhythmstructure) and [_PhasedRhythmStructure_](#phasedrhythmstructure) for simplifying computations

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

> a generalized encoding of euclidean rhythm

```typescript
const basicRhythmStructure: BasicRhythmStructure = {
  rhythmResolution: 5,
  rhythmDensity: 3,
  rhythmOrientation: 0,
  rhythmPhase: 0,
};
```

###### EuclideanRhythmStructure

> a minimal encoding of euclidean rhythm

```typescript
const euclideanRhythm: EuclideanRhythmStructure = {
  rhythmResolution: 5,
  rhythmDensity: 3,
};
```

###### RhythmGroupStructure

> a compact encoding for a set of related [_AlignedRhythmStructure_](#alignedrhythmstructure)

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

> the invariant portion of [_RhythmGroupStructure_](#rhythmgroupstructure)

```typescript
const rhythmGroupBaseStructure: RhythmGroupBaseStructure = {
  structureType: "initial",
  rhythmResolution: 5,
};
```

###### RhythmGroupMemberStructure

> the variant portion of [_RhythmGroupStructure_](#rhythmgroupstructure)

```typescript
const rhythmGroupMemberStructure: RhythmGroupMemberStructure = {
  structureType: "terminal",
  rhythmDensity: 3,
};
```

## rhythm _(functions)_

#### getEuclideanRhythm

> computes the euclidean [_Rhythm_](#rhythm) of the given [_EuclideanRhythmStructure_](#euclideanrhythmstructure)

```typescript
const euclideanRhythm = getEuclideanRhythm({
  rhythmResolution: 5,
  rhythmDensity: 3,
});
// euclideanRhythm === [true,true,false,true,false]
```

###### getGeneralRhythmStructure

> computes the [_GeneralRhythmStructure_](#generalrhythmstructure) of the given [_RhythmStructure_](#rhythmstructure)

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

> transforms

```typescript

```

###### getRelativeRhythmPoints

>

```typescript

```

###### getRhythmComponents

>

```typescript

```

###### getRhythmGroupId

>

```typescript

```

###### getRhythmGroupMembers

>

```typescript

```

###### getAlignedRhythmId

> computes the deterministic string encoding of the given [_AlignedRhythmStructure_](#alignedrhythmstructure)

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

> computes the deterministic string encoding of the given [_PhasedRhythmStructure_](#phasedrhythmstructure)

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

> computes the length between rhythm points of the given [_RhythmMap_](#rhythmmap)

```typescript
const rhythmIntervals = getRhythmIntervals({
  rhythmResolution: 5,
  rhythmPoints: [0, 1, 3],
});
// rhythmIntervals = [1,2,2]
```

###### getRhythmLineage

>

```typescript

```

###### getRhythmMap

> computes the [_RhythmMap_](#rhythmmap) of the given [_RhythmStructure_](#rhythmstructure)

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

>

```typescript

```

###### getRhythmSlotWeights

>

```typescript

```

###### getRhythmString

> transforms a [_RhythmMap_](#rhythmmap) into a string of 1's and 0's

```typescript
const rhythmString = getRhythmString({
  rhythmResolution: 5,
  rhythmPoints: [0, 1, 3],
});
// rhythmString === "11010"
```

###### getRhythmWeight

>

```typescript

```

## primes _(functions)_

###### getNearestPrimes

>

```typescript

```

###### getNumberGreaterThanPrime

>

```typescript

```

###### getPrime

>

```typescript

```

###### getPrimeContainer

>

```typescript

```

###### getPrimeContainers

>

```typescript

```

###### getPrimes

>

```typescript

```

###### getPrimesInRange

>

```typescript

```

###### getPrimesLessThanInclusive

>

```typescript

```

###### getPrimesSlice

>

```typescript

```

###### isPrime

>

```typescript

```

###### isPrimeContainer

>

```typescript

```

## general _(models)_

###### RecursiveSpatialStructure

>

```typescript

```
