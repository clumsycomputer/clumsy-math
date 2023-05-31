# clumsy-math

a math library for the clumsy and curious 🙂

## documentation

- **[rhythm _(concepts)_](#rhythm-concepts)**

- **[rhythm _(encodings)_](#rhythm-encodings)**

- **[rhythm _(functions)_](#rhythm-functions)**

## rhythm _(concepts)_

###### euclid rhythm

> a rhythm who's points are as evenly distributed as possible throughout a discrete space



<sup><i>&emsp;[rhythm](todo),&emsp;[rhythm point](todo)</i></sup>

<sup><i>&emsp;[euclidRhythm](todo),&emsp;[simpleEuclidRhythm](todo),&emsp;[coreEuclidRhythm](todo),&emsp;[coreEuclidMap](todo)</i></sup>

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

<sup><i>&emsp;[RhythmSequence](todo),&emsp;[Rhythm](todo)</i></sup>

###### rhythm density

> the number of points in a rhythm

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPoints = [0, 1, 3];
const rhythmDensity = 3; // rhythmPoints.length
```

<sup><i>&emsp;[rhythm point](todo)</i></sup>

<sup><i>&emsp;[RhythmDensity](todo)</i></sup>

###### rhythm orientation

> the offset of an aligned rhythm, measured in points, relative to a base rhythm

```typescript
const orientationA = 0;
const rhythmMapA = [true, true, false, true, false];
const orientationB = 1;
const rhythmMapB = [true, false, true, false, true];
```

<sup><i>&emsp;[rhythm point](todo),&emsp;[rhythm phase](todo)</i></sup>

<sup><i>&emsp;[RhythmOrientation](todo)</i></sup>

###### rhythm phase

> the offset of a rhythm, measured in slots, relative to a base rhythm

```typescript
const rhythmMap = [true, true, false, true, false];
const rhythmPhase = -1;
const phasedRhythmMap = [false, true, true, false, true];
```

<sup><i>&emsp;[rhythm point](todo),&emsp;[rhythm slot](todo)</i></sup>

<sup><i>&emsp;[RhythmPhase](todo)</i></sup>

###### rhythm point

> the index of a slot whose value is true (1)

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPoints = [0, 1, 3];
```

<sup><i>&emsp;[rhythm slot](todo)</i></sup>

<sup><i>&emsp;[RhythmPoint](todo)</i></sup>

###### rhythm resolution

> the number of slots in a rhythm

```typescript
const rhythm = [true, true, false, true, false];
const rhythmResolution = 5; // rhythm.length
```

<sup><i>&emsp;[rhythm slot](todo)</i></sup>

<sup><i>&emsp;[RhythmResolution](todo)</i></sup>

###### rhythm slot

> a rhythm's building block

```ts
const rhythm = [true, true, false, true, false];
const rhythmSlotZero = true; // rhythm[0]
const rhythmSlotTwo = false; // rhythm[2]
```

<sup><i>&emsp;[rhythm](todo)</i></sup>

<sup><i>&emsp;[RhythmSlot](todo)</i></sup>

## rhythm _(encodings)_

###### EuclidRhythm

> euclid rhythm as Rhythm



<sup><i>&emsp;[euclid rhythm](todo)</i></sup>

###### EuclidRhythmMap

> lossless encoding for euclid rhythm



###### RecursiveEuclidRhythm

> recursive euclid rhythm as Rhythm



<sup><i>&emsp;[recursive euclid rhythm](todo)</i></sup>

###### Rhythm

> the defacto encoding for working with rhythm

```typescript
const rhythm: Rhythm = {
  resolution: 5,
  points: [0, 1, 3]
}
```

<sup><i>&emsp;[rhythm resolution](todo),&emsp;[rhythm point](todo)</i></sup>

<sup><i>&emsp;[rhythm](todo),&emsp;[phasedRhythm](todo),&emsp;[orientatedRhythm](todo),&emsp;[relativeRhythmPoints](todo),&emsp;[rhythmIntervals](todo),&emsp;[rhythmString](todo)</i></sup>

###### RhythmMap

> lossless encoding for rhythm



## rhythm _(functions)_

###### rhythm

> computes RecursiveEuclidRhythm from RecursiveRhythmStructure

```typescript
const rhythmA = rhythm([
  5, [3, 0], [2, 1]
])
// rhythmA === {
//   resolution: 5,
//   points: [0, 3]
// }
```

