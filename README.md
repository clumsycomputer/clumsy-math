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


<sup><i>&emsp;[rhythm](#rhythm),&emsp;[undefined](#undefined)</i></sup>

<sup><i>&emsp;[euclidRhythm](#euclidrhythm-1),&emsp;[simpleEuclidRhythm](#simpleeuclidrhythm-1),&emsp;[undefined](#undefined),&emsp;[undefined](#undefined)</i></sup>

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

<sup><i>&emsp;[undefined](#undefined),&emsp;[Rhythm](#rhythm-1)</i></sup>

###### simple euclid rhythm

> a euclid rhythm that has an orientation and phase of zero (default layout) (most dense left)


<sup><i>&emsp;[euclid rhythm](#euclid-rhythm)</i></sup>

<sup><i>&emsp;[SimpleEuclidRhythm](#simpleeuclidrhythm)</i></sup>

<sup><i>&emsp;[simpleEuclidRhythm](#simpleeuclidrhythm-1)</i></sup>

## rhythm _(encodings)_

###### AlignedEuclidRhythmStructure

> ergonomic encoding for [aligned recursive euclid rhythm](#aligned-recursive-euclid-rhythm)


###### AlignedRecursiveEuclidRhythm

> [aligned recursive euclid rhythm](#aligned-recursive-euclid-rhythm) as [RecursiveEuclidRhythm](#recursiveeuclidrhythm)


###### EuclidRhythm

> [euclid rhythm](#euclid-rhythm) as [Rhythm](#rhythm-1)


###### PhasedEuclidRhythmStructure

> ergonomic encoding for [phased recursive euclid rhythm](#phased-recursive-euclid-rhythm)


###### PhasedRecursiveEuclidRhythm

> [phased recursive euclid rhythm](#phased-recursive-euclid-rhythm) as [RecursiveEuclidRhythm](#recursiveeuclidrhythm)


###### RecursiveEuclidRhythm

> [recursive euclid rhythm](#recursive-euclid-rhythm) as [Rhythm](#rhythm-1)


###### RecursiveEuclidRhythmStructure

> ergonomic encoding for [recursive euclid rhythm](#recursive-euclid-rhythm)


###### Rhythm

> defacto encoding for [rhythm](#rhythm)


###### SimpleEuclidRhythm

> [simple euclid rhythm](#simple-euclid-rhythm) as [EuclidRhythm](#euclidrhythm)


## rhythm _(functions)_

###### euclidRhythm

> computes [EuclidRhythm](#euclidrhythm) from [undefined](#undefined), [undefined](#undefined), [undefined](#undefined), and [undefined](#undefined)
```typescript
const rhythmA = euclidRhythm(5, 3, 0, 0)
// rhythmA === {
//   resolution: 5,
//   points: [0, 1, 3]
// }
```

<sup><i>&emsp;[euclid rhythm](#euclid-rhythm)</i></sup>

###### rhythm

> computes [RecursiveEuclidRhythm](#recursiveeuclidrhythm) from a [RecursiveEuclidRhythmStructure](#recursiveeuclidrhythmstructure)
```typescript
const rhythmA = rhythm([
  5, [3, 0], [2, 1]
])
// rhythmA === {
//   resolution: 5,
//   points: [0, 3]
// }
```

<sup><i>&emsp;[recursive euclid rhythm](#recursive-euclid-rhythm)</i></sup>

<sup><i>&emsp;[AlignedEuclidRhythmStructure](#alignedeuclidrhythmstructure),&emsp;[PhasedEuclidRhythmStructure](#phasedeuclidrhythmstructure)</i></sup>

<sup><i>&emsp;[undefined](#undefined),&emsp;[undefined](#undefined),&emsp;[undefined](#undefined)</i></sup>

###### simpleEuclidRhythm

> computes [SimpleEuclidRhythm](#simpleeuclidrhythm) from [undefined](#undefined) and [undefined](#undefined)


<sup><i>&emsp;[simple euclid rhythm](#simple-euclid-rhythm)</i></sup>

