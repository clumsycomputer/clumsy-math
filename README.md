# clumsy-math

a little library of helpful math utensils 🙂

## rhythm _(models)_

###### Rhythm

> an array / sequence of booleans

```typescript
const rhythm: Rhythm = [true, false, true, false];
```

###### RhythmMap

> the defacto encoding for [_rhythm_](#rhythm)

```typescript
const rhythmMap: RhythmMap = {
  rhythmResolution: 5,
  rhythmPoints: [0, 1, 3],
};
```

###### RhythmStructure

###### AlignedRhythmStructure

###### PhasedRhythmStructure

###### GeneralRhythmStructure

###### BasicRhythmStructure

###### EuclideanRhythmStructure

###### RhythmGroupStructure

###### RhythmGroupBaseStructure

###### RhythmGroupMemberStructure

## rhythm _(functions)_

#### getEuclideanRhythm

> computes the euclidean [_rhythm_](#rhythm) of the given [_euclidean rhythm structure_](#euclideanrhythmstructure)

```typescript
const euclideanRhythm = getEuclideanRhythm({
  rhythmResolution: 5,
  rhythmDensity: 3,
});
// euclideanRhythm === [true,true,false,true,false]
```

###### getGeneralRhythmStructure

###### getPhasedRhythmMap

###### getRelativeRhythmPoints

###### getRhythmComponents

###### getRhythmGroupId

###### getRhythmGroupMembers

###### getAlignedRhythmId

> computes the deterministic id of the given [_aligned rhythm structure_](#alignedrhythmstructure)

```typescript
const alignedRhythmId = getAlignedRhythmId({
  structureType: 'initial',
  rhythmResolution: 5,
  subStructure: {
    structureType: 'terminal'
    rhythmDensity: 3,
    rhythmOrientation: 0
  }
})
// alignedRhythmId === todo
```

###### getPhasedRhythmId

> computes the deterministic id of the given [_phased rhythm structure_](#phasedrhythmstructure)

```typescript
const phasedRhythmId = getPhasedRhythmId({
  structureType: 'initial',
  rhythmResolution: 5,
  rhythmPhase: 0,
  subStructure: {
    structureType: 'terminal'
    rhythmDensity: 3,
    rhythmOrientation: 0
  }
})
// phasedRhythmId === todo
```

###### getRhythmIntervals

###### getRhythmLineage

###### getRhythmMap

> computes the [_rhythm map_](#rhythmmap) of the given [_rhythm structure_](#rhythmstructure)

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

###### getRhythmSlotWeights

###### getRhythmString

> transforms a rhythm map into a string of 1's and 0's

```typescript
const rhythmString = getRhythmString({
  rhythmResolution: 5,
  rhythmPoints: [0, 1, 3],
});
// rhythmString === "11010"
```

###### getRhythmWeight

## primes _(functions)_

###### getNearestPrimes

###### getNumberGreaterThanPrime

###### getPrime

###### getPrimeContainer

###### getPrimeContainers

###### getPrimes

###### getPrimesInRange

###### getPrimesLessThanInclusive

###### getPrimesSlice

###### isPrime

###### isPrimeContainer
