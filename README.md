# clumsy-math

a math library for the clumsy and curious 🙂

## documentation

- **[rhythm _(concepts)_](#rhythm-concepts)**

- **[rhythm _(encodings)_](#rhythm-encodings)**

- **[rhythm _(functions)_](#rhythm-functions)**

## rhythm _(concepts)_

###### aligned recursive euclid rhythm

> a recursive euclid rhythm where each layer has a point at zero (slot)

###### euclid rhythm

> a rhythm whose points are as evenly distributed as possible throughout a discrete space

###### phased recursive euclid rhythm

> a recursive euclid rhythm where all of the individual layers are phaseable

###### recursive euclid rhythm

> a rhythm where euclid rhythms are stacked on top of one another such that the base rhythm's density / points determines the next rhythm's resolution / space
```typescript
const baseRhythm = [true, true, false, true, false];
const terminalRhythm = [true, false, true];
const resultRhythm = [true, false, false, true, false];
```
###### rhythm

> a discrete sequence / cycle of binary values
```typescript
const rhythmMap = [true, true, false, true, false];
const rhythm = { resolution: 5, points: [0, 1, 3] }
```
## rhythm _(encodings)_

###### AlignedEuclidRhythmStructure

> ergonomic encoding for [aligned recursive euclid rhythm](todo)

###### AlignedRecursiveEuclidRhythm

> [aligned recursive euclid rhythm](todo) as [RecursiveEuclidRhythm](todo)

###### EuclidRhythm

> [euclid rhythm](todo) as [Rhythm](todo)

###### PhasedEuclidRhythmStructure

> ergonomic encoding for [phased recursive euclid rhythm](todo)

###### PhasedRecursiveEuclidRhythm

> [phased recursive euclid rhythm](todo) as [RecursiveEuclidRhythm](todo)

###### RecursiveEuclidRhythm

> [recursive euclid rhythm](todo) as [Rhythm](todo)

###### RecursiveEuclidRhythmStructure

> ergonomic encoding for [recursive euclid rhythm](todo)

###### Rhythm

> defacto encoding for [rhythm](todo)

## rhythm _(functions)_

###### rhythm

> computes [RecursiveEuclidRhythm](todo) from a [RecursiveEuclidRhythmStructure](todo)
```typescript
const rhythmA = rhythm([
  5, [3, 0], [2, 1]
])
// rhythmA === {
//   resolution: 5,
//   points: [0, 3]
// }
```
