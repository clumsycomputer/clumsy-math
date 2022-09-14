# clumsy-math

a little library of helpful math utensils 🙂

## installation

```bash
yarn add clumsy-math
```

## documentation

- **[rhythm _(concepts)_](#rhythm-concepts)**

  - **[rhythm slot](#rhythm-slot)**

  - **[rhythm resolution](#rhythm-resolution)**

  - **[rhythm point](#rhythm-point)**

  - **[rhythm density](#rhythm-density)**

  - **[rhythm phase](#rhythm-phase)**

  - **[rhythm orientation](#rhythm-orientation)**

  - **[relative rhythm point](#relative-rhythm-point)**

  - **[rhythm interval](#rhythm-interval)**

  - **[rhythm](#rhythm)**

  - **[euclidean rhythm](#euclidean-rhythm---white-paper)**

  - **[recursive euclidean rhythm](#recursive-euclidean-rhythm)**

  - **[aligned recursive euclidean rhythm](#aligned-recursive-euclidean-rhythm)**

  - **[phased recursive euclidean rhythm](#phased-recursive-euclidean-rhythm)**

  - **[rhythm component](#rhythm-component)**

  - **[rhythm group](#rhythm-group)**

  - **[rhythm lineage](#rhythm-lineage)**

  - **[rhythm slot weight](#rhythm-slot-weight)**

  - **[rhythm point weight](#rhythm-point-weight)**

  - **[rhythm weight](#rhythm-weight)**

- **[rhythm _(encodings)_](#rhythm-encodings)**

  - **[RhythmSlot](#rhythmslot)**

  - **[RhythmResolution](#rhythmresolution)**

  - **[RhythmDensity](#rhythmdensity)**

  - **[RhythmPoint](#rhythmpoint)**

  - **[RelativeRhythmPoint](#relativerhythmpoint)**

  - **[RhythmInterval](#rhythminterval)**

  - **[RhythmPhase](#rhythmphase)**

  - **[RhythmOrientation](#rhythmorientation)**

  - **[Rhythm](#rhythm)**

  - **[RhythmString](#rhythmstring)**

  - **[RhythmMap](#rhythmmap)**

  - **[EuclideanRhythm](#euclideanrhythm)**

  - **[SimpleRhythmStructure](#simplerhythmstructure)**

  - **[GeneralRhythmStructure](#generalrhythmstructure)**

  - **[RecursiveEuclideanRhythm](#recursiveeuclideanrhythm)**

  - **[RecursiveRhythmStructure](#recursiverhythmstructure)**

  - **[StackRhythmStructure](#stackrhythmstructure)**

  - **[AlignedRecursiveEuclideanRhythm](#alignedrecursiveeuclideanrhythm)**

  - **[AlignedRhythmStructure](#alignedrhythmstructure)**

  - **[AlignedRecursiveEuclideanRhythmId](#alignedrecursiveeuclideanrhythmid)**

  - **[AlignedRhythmComponent](#alignedrhythmcomponent)**

  - **[PhasedRecursiveEuclideanRhythm](#phasedrecursiveeuclideanrhythm)**

  - **[PhasedRhythmStructure](#phasedrhythmstructure)**

  - **[PhasedRecursiveEuclideanRhythmId](#phasedrecursiveeuclideanrhythmid)**

  - **[PhasedRhythmComponent](#phasedrhythmcomponent)**

  - **[RhythmGroup](#rhythmgroup)**

  - **[RhythmGroupStructure](#rhythmgroupstructure)**

  - **[RhythmGroupId](#rhythmgroupid)**

  - **[RhythmLineage](#rhythmlineage)**

  - **[RhythmSlotWeight](#rhythmslotweight)**

  - **[RhythmPointWeight](#rhythmpointweight)**

  - **[RhythmWeight](#rhythmweight)**

- **[rhythm _(functions)_](#rhythm-functions)**

  - **[getSimpleRhythm](#getsimplerhythm)**

  - **[getRhythmMap](#getrhythmmap)**

  - **[getRhythmString](#getrhythmstring)**

  - **[getStackRhythmStructure](#getstackrhythmstructure)**

  - **[getPhasedRhythmMap](#getphasedrhythmmap)**

  - **[getRhythmIntervals](#getrhythmintervals)**

  - **[getRelativeRhythmPoints](#getrelativerhythmpoints)**

  - **[getPhasedRhythmId](#getphasedrhythmid)**

  - **[getPhasedRhythmComponents](#getphasedrhythmcomponents)**

  - **[getAlignedRhythmId](#getalignedrhythmid)**

  - **[getAlignedRhythmComponents](#getalignedrhythmcomponents)**

  - **[getRhythmGroup](#getrhythmgroup)**

  - **[getRhythmGroupId](#getrhythmgroupid)**

  - **[getRhythmLineage](#getrhythmlineage)**

  - **[getRhythmPointWeights](#getrhythmpointweights)**

  - **[getRhythmSlotWeights](#getrhythmslotweights)**

  - **[getRhythmWeight](#getrhythmweight)**

- **[primes _(functions)_](#primes-functions)**

  - **[getPrime](#getprime)**

  - **[getPrimes](#getprimes)**

  - **[getPrimesLessThanInclusive](#getprimeslessthaninclusive)**

  - **[getNearestPrimes](#getnearestprimes)**

  - **[getPrimesRangeInclusive](#getprimesrangeinclusive)**

  - **[getPrimesSlice](#getprimesslice)**

  - **[isPrime](#isprime)**

  - **[getNumberGreaterThanPrime](#getnumbergreaterthanprime)**

  - **[getPrimeContainer](#getprimecontainer)**

  - **[getPrimeContainers](#getprimecontainers)**

  - **[isPrimeContainer](#isprimecontainer)**

## rhythm _(concepts)_

###### rhythm slot

> a rhythm's building block

```typescript
const rhythm = [true, true, false, true, false];
const rhythmSlotZero = true; // rhythm[0]
const rhythmSlotTwo = false; // rhythm[2]
```

<sup><i>&emsp;[rhythm](#rhythm)</i></sup>

<sup><i>&emsp;[RhythmSlot](#rhythmslot)</i></sup>

###### rhythm resolution

> the number of slots that make up a rhythm

```typescript
const rhythm = [true, true, false, true, false];
const rhythmResolution = 5; // rhythm.length
```

<sup><i>&emsp;[rhythm slot](#rhythm-slot)</i></sup>

<sup><i>&emsp;[RhythmResolution](#rhythmresolution),&emsp;[RhythmMap](#rhythmmap)</i></sup>

<sup><i>&emsp;[getRhythmMap](#getrhythmmap)</i></sup>

###### rhythm point

> the index of a slot whose value is true/1

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPoints = [0, 1, 3];
```

<sup><i>&emsp;[rhythm slot](#rhythm-slot)</i></sup>

<sup><i>&emsp;[RhythmPoint](#rhythmpoint),&emsp;[RhythmMap](#rhythmmap)</i></sup>

<sup><i>&emsp;[getRhythmMap](#getrhythmmap)</i></sup>

###### rhythm density

> the number of points in a rhythm

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPoints = [0, 1, 3];
const rhythmDensity = 3; // rhythmPoints.length
```

<sup><i>&emsp;[rhythm point](#rhythm-point)</i></sup>

<sup><i>&emsp;[RhythmDensity](#rhythmdensity)</i></sup>

###### rhythm phase

> an offset measured in slots applied to points relative to a base rhythm

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPhase = -1;
const phasedRhythm = [false, true, true, false, true];
```

<sup><i>&emsp;[rhythm point](#rhythm-point),&emsp;[rhythm slot](#rhythm-slot)</i></sup>

<sup><i>&emsp;[RhythmPhase](#rhythmphase)</i></sup>

<sup><i>&emsp;[getPhasedRhythmMap](#getphasedrhythmmap)</i></sup>

###### rhythm orientation

> the point index relative to a base rhythm that indicates a reoriented rhythm's anchor/starting point

```typescript
const rhythm = [true, true, false, true, false];
const reorientedRhythm = [true, false, true, false, true];
const reorientedRhythmOrientation = 1;
```

<sup><i>&emsp;[rhythm point](#rhythm-point),&emsp;[rhythm resolution](#rhythm-resolution)</i></sup>

<sup><i>&emsp;[RhythmOrientation](#rhythmorientation)</i></sup>

###### relative rhythm point

> a point whose value is normalized within the range of [0, 1)

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPoints = [0, 1, 3];
const relativeRhythmPoints = [0, 0.2, 0.6];
```

<sup><i>&emsp;[rhythm point](#rhythm-point),&emsp;[rhythm resolution](#rhythm-resolution)</i></sup>

<sup><i>&emsp;[RelativeRhythmPoint](#relativerhythmpoint)</i></sup>

<sup><i>&emsp;[getRelativeRhythmPoints](#getrelativerhythmpoints)</i></sup>

###### rhythm interval

> the length/distance between two points measured in slots

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPoints = [0, 1, 3];
const rhythmIntervals = [1, 2, 2];
```

<sup><i>&emsp;[rhythm point](#rhythm-point),&emsp;[rhythm slot](#rhythm-slot)</i></sup>

<sup><i>&emsp;[RhythmInterval](#rhythminterval)</i></sup>

<sup><i>&emsp;[getRhythmIntervals](#getrhythmintervals)</i></sup>

###### rhythm

> a discrete sequence/cycle of binary values

```typescript
const rhythm = [true, true, false, true, false];
```

<sup><i>&emsp;[Rhythm](#rhythm-1)</i></sup>

<sup><i>&emsp;[getRhythmString](#getrhythmstring)</i></sup>

###### euclidean rhythm - [white paper](http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf)

> a rhythm who's points are as evenly distributed as possible throughout a discrete space

```typescript
const rhythmAaa = [true, false, true, false];
const rhythmBbb = [true, true, false, true, false];
const rhythmCcc = [true, false, true, false, true];
```

<sup><i>&emsp;[rhythm](#rhythm),&emsp;[rhythm point](#rhythm-point)</i></sup>

<sup><i>&emsp;[getSimpleRhythm](#getsimplerhythm)</i></sup>

###### recursive euclidean rhythm

> a rhythm composed by stacking euclidean rhythms on top of each other where the base rhythm's density/points determines the next rhythm's resolution/space

```typescript
const baseRhythm = [true, true, false, true, false];
const terminalRhythm = [true, false, true];
const resultRhythm = [true, false, false, true, false];
```

<sup><i>&emsp;[rhythm component](#rhythm-component),&emsp;[euclidean rhythm](#euclidean-rhythm---white-paper),&emsp;[rhythm point](#rhythm-point),&emsp;[rhythm resolution](#rhythm-resolution),&emsp;[aligned recursive euclidean rhythm](#alignedrecursiveeuclideanrhythm),&emsp;[phased recursive euclidean rhythm](#phasedrecursiveeuclideanrhythm)</i></sup>

<sup><i>&emsp;[RecursiveEuclideanRhythm](#recursiveeuclideanrhythm),&emsp;[RecursiveRhythmStructure](#recursiverhythmstructure)</i></sup>

<sup><i>&emsp;[getStackRhythmStructure](#getstackrhythmstructure)</i></sup>

###### aligned recursive euclidean rhythm

> a recursive euclidean rhythm where rhythm layers have a phase of zero such that one of it's points remains anchored to the zero slot

```typescript
const baseRhythm = [true, true, false, true, false];
const terminalRhythm = [true, false, true];
const resultRhythm = [true, false, false, true, false];
```

<sup><i>&emsp;[recursive euclidean rhythm](#recursive-euclidean-rhythm),&emsp;[rhythm slot](#rhythm-slot),&emsp;[rhythm phase](#rhythm-phase)</i></sup>

<sup><i>&emsp;[AlignedRecursiveEuclideanRhythm](#alignedrecursiveeuclideanrhythm),&emsp;[AlignedRecursiveEuclideanRhythmId](#alignedrecursiveeuclideanrhythmid)</i></sup>

<sup><i>&emsp;[getAlignedRhythmId](#getalignedrhythmid),&emsp;[getAlignedRhythmComponents](#getalignedrhythmcomponents)</i></sup>

###### phased recursive euclidean rhythm

> a recursive euclidean rhythm where rhythm layers can be phased

```typescript
const baseRhythm = [true, true, false, true, false];
const terminalRhythm = [false, true, true]; // phase === -1
const resultRhythm = [false, true, false, true, false];
```

<sup><i>&emsp;[recursive euclidean rhythm](#recursive-euclidean-rhythm),&emsp;[rhythm phase](#rhythm-phase)</i></sup>

###### rhythm component

> a recursive euclidean rhythm of a recursive euclidean rhythm

<!--  prettier-ignore -->
```typescript
const terminalComponentRhythm = [true, false, false, false, true, false, false];
const interposedComponentRhythm = [true, true, false, false, true, false, false];
const initialComponentRhythm = [true, true, true, false, true, true, false];
```

<sup><i>&emsp;[recursive euclidean rhythm](#recursive-euclidean-rhythm)</i></sup>

<sup><i>&emsp;[PhasedRhythmComponent](#phasedrhythmcomponent),&emsp;[AlignedRhythmComponent](#alignedrhythmcomponent)</i></sup>

<sup><i>&emsp;[getPhasedRhythmComponents](#getphasedrhythmcomponents),&emsp;[getAlignedRhythmComponents](#getalignedrhythmcomponents)</i></sup>

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

<sup><i>&emsp;[rhythm lineage](#rhythm-lineage)</i></sup>

<sup><i>&emsp;[RhythmGroup](#rhythmgroup),&emsp;[RhythmGroupStructure](#rhythmgroupstructure),&emsp;[RhythmGroupId](#rhythmgroupid)</i></sup>

<sup><i>&emsp;[getRhythmGroup](#getrhythmgroup),&emsp;[getRhythmGroupId](#getrhythmgroupid),&emsp;[getRhythmLineage](#getrhythmlineage)</i></sup>

###### rhythm lineage

> all rhythm groups an aligned recursive euclidean rhythm belongs to

```typescript
const rhythm = [true, false, false, true, false];
const rhythmLineage = [
  [
    [true, true, false, false, false],
    [true, false, false, true, false],
    [true, false, true, false, false],
    [true, false, false, false, true],
    [true, false, true, false, false],
    [true, false, false, true, false],
  ],
  [
    [true, true, false, false, false],
    [true, false, false, true, false],
  ],
];
```

<sup><i>&emsp;[rhythm group](#rhythm-group),&emsp;[aligned recursive euclidean rhythm](#aligned-recursive-euclidean-rhythm)</i></sup>

<sup><i>&emsp;[RhythmLineage](#rhythmlineage)</i></sup>

<sup><i>&emsp;[getRhythmLineage](#getrhythmlineage)</i></sup>

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

<sup><i>&emsp;[RhythmSlotWeight](#rhythmslotweight),&emsp;[RhythmPointWeight](#rhythmpointweight),&emsp;[RhythmWeight](#rhythmweight)</i></sup>

<sup><i>&emsp;[getRhythmSlotWeights](#getrhythmslotweights),&emsp;[getRhythmPointWeights](#getrhythmpointweights),&emsp;[getRhythmWeight](#getrhythmweight)</i></sup>

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

<sup><i>&emsp;[RhythmPointWeight](#rhythmpointweight)</i></sup>

<sup><i>&emsp;[getRhythmPointWeights](#getrhythmpointweights)</i></sup>

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

<sup><i>&emsp;[RhythmWeight](#rhythmweight)</i></sup>

<sup><i>&emsp;[getRhythmWeight](#getrhythmweight)</i></sup>

## rhythm _(encodings)_

###### RhythmSlot

> rhythm slot as _boolean_

<sup><i>&emsp;[rhythm slot](#rhythm-slot)</i></sup>

<sup><i>&emsp;[getRhythmSlotWeights](#getrhythmslotweights)</i></sup>

###### RhythmResolution

> rhythm resolution as _number_

<sup><i>&emsp;[rhythm resolution](#rhythm-resolution)</i></sup>

###### RhythmDensity

> rhythm density as _number_

<sup><i>&emsp;[rhythm density](#rhythm-density)</i></sup>

###### RhythmPoint

> rhythm point as _number_

<sup><i>&emsp;[rhythm point](#rhythm-point)</i></sup>

###### RelativeRhythmPoint

> relative rhythm point as _number_

<sup><i>&emsp;[relative rhythm point](#relative-rhythm-point)</i></sup>

<sup><i>&emsp;[getRelativeRhythmPoints](#getrelativerhythmpoints)</i></sup>

###### RhythmInterval

> rhythm interval as _number_

<sup><i>&emsp;[rhythm interval](#rhythm-interval)</i></sup>

<sup><i>&emsp;[getRhythmIntervals](#getrhythmintervals)</i></sup>

###### RhythmPhase

> rhythm phase as _number_

<sup><i>&emsp;[rhythm phase](#rhythm-phase)</i></sup>

<sup><i>&emsp;[getPhasedRhythmMap](#getphasedrhythmmap)</i></sup>

###### RhythmOrientation

> rhythm orientation as _number_

<sup><i>&emsp;[rhythm orientation](#rhythm-orientation)</i></sup>

###### Rhythm

> rhythm as _Array<[RhythmSlot](#rhythmslot)>_

```typescript
const rhythm: Rhythm = [true, true, false, true, false];
```

<sup><i>&emsp;[rhythm](#rhythm)</i></sup>

<sup><i>&emsp;[RhythmMap](#rhythmmap)</i></sup>

<sup><i>&emsp;[getSimpleRhythm](#getsimplerhythm)</i></sup>

###### RhythmString

> rhythm as binary _string_

```typescript
const rhythmString: RhythmString = "11010";
```

<sup><i>&emsp;[rhythm](#rhythm)</i></sup>

<sup><i>&emsp;[getRhythmString](#getrhythmstring)</i></sup>

###### RhythmMap

> the defacto encoding for _[Rhythm](#rhythm-1)_

```typescript
const rhythmMap: RhythmMap = {
  rhythmResolution: 5,
  rhythmPoints: [0, 1, 3],
};
```

<sup><i>&emsp;[rhythm resolution](#rhythm-resolution),&emsp;[rhythm point](#rhythm-point)</i></sup>

<sup><i>&emsp;[getRhythmMap](#getrhythmmap),&emsp;[getRhythmString](#getrhythmstring),&emsp;[getPhasedRhythmMap](#getphasedrhythmmap),&emsp;[getRelativeRhythmPoints](#getrelativerhythmpoints),&emsp;[getRhythmSlotWeights](#getrhythmslotweights),&emsp;[getRhythmPointWeights](#getrhythmpointweights),&emsp;[getRhythmWeight](#getrhythmweight)</i></sup>

###### EuclideanRhythm

> euclidean rhythm as _[Rhythm](#rhythm-1)_

<sup><i>&emsp;[euclidean rhythm](#euclidean-rhythm---white-paper)</i></sup>

###### SimpleRhythmStructure

> minimal encoding for _[EuclideanRhythm](#euclideanrhythm)_

```typescript
const simpleRhythmStructure: SimpleRhythmStructure = {
  rhythmResolution: 5,
  rhythmDensity: 3,
};
```

<sup><i>&emsp;[euclidean rhythm](#euclidean-rhythm---white-paper),&emsp;[rhythm resolution](#rhythm-resolution),&emsp;[rhythm density](#rhythm-density)</i></sup>

<sup><i>&emsp;[getSimpleRhythm](#getsimplerhythm)</i></sup>

###### GeneralRhythmStructure

> generalized encoding for _[EuclideanRhythm](#euclideanrhythm)_

```typescript
const generalRhythmStructure: GeneralRhythmStructure = {
  rhythmResolution: 5,
  rhythmDensity: 3,
  rhythmOrientation: 0,
  rhythmPhase: 0,
};
```

<sup><i>&emsp;[euclidean rhythm](#euclidean-rhythm---white-paper),&emsp;[rhythm resolution](#rhythm-resolution),&emsp;[rhythm density](#rhythm-density),&emsp;[rhythm orientation](#rhythm-orientation),&emsp;[rhythm phase](#rhythm-phase)</i></sup>

###### RecursiveEuclideanRhythm

> recursive euclidean rhythm as _[Rhythm](#rhythm-1)_

<sup><i>&emsp;[recursive euclidean rhythm](#recursive-euclidean-rhythm)</i></sup>

###### RecursiveRhythmStructure

> foundational encoding for _[RecursiveEuclideanRhythm](#recursiveeuclideanrhythm)_

<sup><i>&emsp;[recursive euclidean rhythm](#recursive-euclidean-rhythm)</i></sup>

<sup><i>&emsp;[getRhythmMap](#getrhythmmap),&emsp;[getStackRhythmStructure](#getstackrhythmstructure)</i></sup>

###### StackRhythmStructure

> utilitarian encoding that encompasses both _[AlignedRhythmStructure](#alignedrhythmstructure)_ and _[PhasedRhythmStructure](#phasedrhythmstructure)_

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

<sup><i>&emsp;[aligned recursive euclidean rhythm](#aligned-recursive-euclidean-rhythm),&emsp;[phased recursive euclidean rhythm](#phased-recursive-euclidean-rhythm)</i></sup>

<sup><i>&emsp;[GeneralRhythmStructure](#generalrhythmstructure)</i></sup>

<sup><i>&emsp;[getStackRhythmStructure](#getstackrhythmstructure)</i></sup>

###### AlignedRecursiveEuclideanRhythm

> aligned recursive euclidean rhythm as _[RecursiveEuclideanRhythm](#recursiveeuclideanrhythm)_

<sup><i>&emsp;[aligned recursive euclidean rhythm](#aligned-recursive-euclidean-rhythm)</i></sup>

###### AlignedRhythmStructure

> a human-centric encoding for _[AlignedRecursiveEuclideanRhythm](#alignedrecursiveeuclideanrhythm)_

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

<sup><i>&emsp;[getRhythmMap](#getrhythmmap),&emsp;[getAlignedRhythmId](#getalignedrhythmid),&emsp;[getRhythmLineage](#getrhythmlineage)</i></sup>

###### AlignedRecursiveEuclideanRhythmId

> aligned recursive euclidean rhythm as _string_

<sup><i>&emsp;[aligned recursive euclidean rhythm](#aligned-recursive-euclidean-rhythm)</i></sup>

<sup><i>&emsp;[getAlignedRhythmId](#getalignedrhythmid)</i></sup>

###### AlignedRhythmComponent

> aligned rhythm component as _[AlignedRhythmStructure](#alignedrhythmstructure)_

<sup><i>&emsp;[rhythm component](#rhythm-component)</i></sup>

<sup><i>&emsp;[getAlignedRhythmComponents](#getalignedrhythmcomponents)</i></sup>

###### PhasedRecursiveEuclideanRhythm

> phased recursive euclidean rhythm as _[RecursiveEuclideanRhythm](#recursiveeuclideanrhythm)_

<sup><i>&emsp;[phased recursive euclidean rhythm](#phased-recursive-euclidean-rhythm)</i></sup>

###### PhasedRhythmStructure

> a human-centric encoding for _[PhasedRecursiveEuclideanRhythm](#phasedrecursiveeuclideanrhythm)_

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

<sup><i>&emsp;[getPhasedRhythmId](#getphasedrhythmid)</i></sup>

###### PhasedRecursiveEuclideanRhythmId

> phased recursive euclidean rhythm as _string_

<sup><i>&emsp;[phased recursive euclidean rhythm](#phased-recursive-euclidean-rhythm)</i></sup>

<sup><i>&emsp;[getPhasedRhythmId](#getphasedrhythmid)</i></sup>

###### PhasedRhythmComponent

> phased rhythm component as _[PhasedRhythmStructure](#phasedrhythmstructure)_

<sup><i>&emsp;[rhythm component](#rhythm-component)</i></sup>

<sup><i>&emsp;[getPhasedRhythmComponents](#getphasedrhythmcomponents)</i></sup>

###### RhythmGroup

> rhythm group as _Array<[AlignedRecursiveEuclideanRhythm](#alignedrecursiveeuclideanrhythm)>_

<sup><i>&emsp;[rhythm group](#rhythm-group),&emsp;[aligned recursive euclidean rhythm](#aligned-recursive-euclidean-rhythm)</i></sup>

<sup><i>&emsp;[getRhythmGroup](#getrhythmgroup)</i></sup>

###### RhythmGroupStructure

> compact encoding for _[RhythmGroup](#rhythmgroup)_

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

<sup><i>&emsp;[RhythmLineage](#rhythmlineage)</i></sup>

<sup><i>&emsp;[getRhythmGroup](#getrhythmgroup),&emsp;[getRhythmGroupId](#getrhythmgroupid)</i></sup>

###### RhythmGroupId

> rhythm group as _string_

<sup><i>&emsp;[rhythm group](#rhythm-group)</i></sup>

<sup><i>&emsp;[getRhythmGroupId](#getrhythmgroupid)</i></sup>

###### RhythmLineage

> rhythm lineage as _Array<[RhythmGroupStructure](#rhythmgroupstructure)>_

<sup><i>&emsp;[rhythm lineage](#rhythm-lineage)</i></sup>

<sup><i>&emsp;[getRhythmLineage](#getrhythmlineage)</i></sup>

###### RhythmSlotWeight

> rhythm slot weight as _number_

<sup><i>&emsp;[rhythm slot weight](#rhythm-slot-weight)</i></sup>

<sup><i>&emsp;[getRhythmSlotWeights](#getrhythmslotweights),&emsp;[getRhythmPointWeights](#getrhythmpointweights),&emsp;[getRhythmWeight](#getrhythmweight)</i></sup>

###### RhythmPointWeight

> rhythm point weight as _number_

<sup><i>&emsp;[rhythm point weight](#rhythm-point-weight)</i></sup>

<sup><i>&emsp;[getRhythmPointWeights](#getrhythmpointweights)</i></sup>

###### RhythmWeight

> rhythm weight as _number_

<sup><i>&emsp;[rhythm weight](#rhythm-weight)</i></sup>

<sup><i>&emsp;[getRhythmWeight](#getrhythmweight),&emsp;[getRhythmWeight](#getrhythmweight)</i></sup>

## rhythm _(functions)_

#### getSimpleRhythm

> transforms _[SimpleRhythmStructure](#simplerhythmstructure)_ to _[Rhythm](#rhythm)_

```typescript
const simpleRhythm = getSimpleRhythm({
  rhythmResolution: 5,
  rhythmDensity: 3,
});
// simpleRhythm === [true,true,false,true,false]
```

<sup><i>&emsp;[euclidean rhythm](#euclidean-rhythm---white-paper),&emsp;[rhythm](#rhythm)</i></sup>

###### getStackRhythmStructure

> transforms _[RecursiveRhythmStructure](#recursiverhythmstructure)_ to _[StackRhythmStructure](#stackrhythmstructure)_

```typescript
const stackRhythmStructure = getStackRhythmStructure({
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
// stackRhythmStructure ===
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

<sup><i>&emsp;[recursive euclidean rhythm](#recursive-euclidean-rhythm)</i></sup>

###### getPhasedRhythmMap

> computes _[RhythmMap](#rhythmmap)_ from _[RhythmMap](#rhythmmap)_ and _[RhythmPhase](#rhythmphase)_

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

<sup><i>&emsp;[rhythm phase](#rhythm-phase)</i></sup>

###### getRelativeRhythmPoints

> transforms _[RhythmMap](#rhythmmap)_ to _Array<[RelativeRhythmPoint](#relativerhythmpoint)>_

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

<sup><i>&emsp;[relative rhythm point](#relative-rhythm-point)</i></sup>

###### getPhasedRhythmComponents

> computes _Array<[PhaseRhythmComponent](#phasedrhythmcomponent)>_ from _[PhasedRhythmStructure](#phasedrhythmstructure)_

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

<sup><i>&emsp;[rhythm component](#rhythm-component),&emsp;[phased recursive euclidean rhythm](#phased-recursive-euclidean-rhythm)</i></sup>

###### getAlignedRhythmComponents

> computes _Array<[AlignedRhythmComponent](#alignedrhythmcomponent)>_ from _[AlignedRhythmStructure](#alignedrhythmstructure)_

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

<sup><i>&emsp;[rhythm component](#rhythm-component),&emsp;[aligned recursive euclidean rhythm](#aligned-recursive-euclidean-rhythm)</i></sup>

###### getRhythmGroupId

> transforms _[RhythmGroupStructure](#rhythmgroupstructure)_ to _[RhythmGroupId](#rhythmgroupid)_

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

<sup><i>&emsp;[rhythm group](#rhythm-group)</i></sup>

###### getRhythmGroup

> transforms _[RhythmGroupStructure](#rhythmgroupstructure)_ to _[RhythmGroup](#rhythmgroup)_

```typescript
const rhythmGroup = getRhythmGroup({
  baseStructure: {
    structureType: "initial",
    rhythmResolution: 5,
  },
  memberStructure: {
    structureType: "terminal",
    rhythmDensity: 3,
  },
});
// rhythmGroup ===
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

<sup><i>&emsp;[rhythm group](#rhythm-group)</i></sup>

###### getAlignedRhythmId

> transforms _[AlignedRhythmStructure](#alignedrhythmstructure)_ to _[AlignedRecursiveEuclideanRhythmId](#alignedrecursiveeuclideanrhythmid)_

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

<sup><i>&emsp;[aligned recursive euclidean rhythm](#aligned-recursive-euclidean-rhythm)</i></sup>

###### getPhasedRhythmId

> transforms _[PhasedRhythmStructure](#phasedrhythmstructure)_ to _[PhasedRecursiveEuclideanRhythmId](#phasedrecursiveeuclideanrhythmid)_

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

<sup><i>&emsp;[phased recursive euclidean rhythm](#phased-recursive-euclidean-rhythm)</i></sup>

###### getRhythmIntervals

> computes _Array<[RhythmInterval](#rhythminterval)>_ from _[RhythmMap](#rhythmmap)_

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

<sup><i>&emsp;[rhythm interval](#rhythm-interval)</i></sup>

###### getRhythmLineage

> computes _[RhythmLineage](#rhythmlineage)_ from _[AlignedRhythmStructure](#alignedrhythmstructure)_

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

<sup><i>&emsp;[rhythm lineage](#rhythm-lineage),&emsp;[rhythm group](#rhythm-group)</i></sup>

###### getRhythmMap

> transforms _[RecursiveRhythmStructure](#recursiverhythmstructure)_ to _[RhythmMap](#rhythmmap)_

```typescript
const rhythmMap = getRhythmMap({
  structureType: 'initial',
  rhythmResolution: 5,
  subStructure: {
    structureType: 'interposed'
    rhythmDensity: 3,
    rhythmOrientation: 0,
    subStructure: {
      structureType: 'terminal',
      rhythmDensity: 2,
      rhythmOrientation: 1
    }
  }
})
// rhythmMap === {
//   rhythmResolution: 5,
//   rhythmPoints: [0,3]
// }
```

<sup><i>&emsp;[rhythm resolution](#rhythm-resolution),&emsp;[rhythm point](#rhythm-point)</i></sup>

###### getRhythmPointWeights

> computes _Array<[RhythmPointWeight](#rhythmpointweight)>_ from _[RhythmMap](#rhythmmap)_ and _Array<[RhythmSlotWeight](#rhythmslotweight)>_

```typescript
const rhythmGroupRhythmMaps = getRhythmGroup({
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

<sup><i>&emsp;[rhythm point weight](#rhythm-point-weight),&emsp;[rhythm slot weight](#rhythm-slot-weight)</i></sup>

###### getRhythmSlotWeights

> transforms _Array<[RhythmMap](#rhythmmap)>_ to _Array<[RhythmSlotWeight](#rhythmslotweight)>_

```typescript
const rhythmSlotWeights = getRhythmSlotWeights(
  getRhythmGroup({
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

<sup><i>&emsp;[rhythm slot weight](#rhythm-slot-weight)</i></sup>

###### getRhythmString

> transforms _[RhythmMap](#rhythmmap)_ to _[RhythmString](#rhythmstring)_

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

<sup><i>&emsp;[rhythm](#rhythm)</i></sup>

###### getRhythmWeight

> computes _[RhythmWeight](#rhythmweight)_ from _[RhythmMap](#rhythmmap)_ and _Array<[RhythmSlotWeight](#rhythmslotweight)>_

```typescript
const rhythmGrouphRythmMaps = getRhythmGroup({
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

<sup><i>&emsp;[rhythm weight](#rhythm-weight),&emsp;[rhythm slot weight](#rhythm-slot-weight)</i></sup>

<sup><i>&emsp;[getRhythmSlotWeights](#getrhythmslotweights)</i></sup>

## primes _(functions)_

###### getPrime

> computes prime of given prime index

```typescript
const prime = getPrime(3);
// prime === 7
```

###### getPrimes

> computes primes up to given prime index

```typescript
const primes = getPrimes(3);
// primes === [2, 3, 5, 7]
```

###### getPrimesLessThanInclusive

> computes primes less than or equal to given number

```typescript
const primesLessThan12 = getPrimesLessThanInclusive(12);
// primesLessThan12 = [2, 3, 5, 7, 11]
```

###### getNearestPrimes

> computes the nearest prime below and above given number

```typescript
const nearestPrimes = getNearestPrimes(10);
// nearestPrimes === [7, 11]
```

###### getPrimesRangeInclusive

> computes primes contained within given minimum number and maximum number

```typescript
const primesRange = getPrimesRangeInclusive(4, 11);
// primesRange === [5, 7, 11]
```

###### getPrimesSlice

> computes primes from given minimum prime index to given maximum prime index

```typescript
const primesSlice = getPrimesSlice(3, 5);
// primesSlice === [7, 11, 13]
```

###### getNumberGreaterThanPrime

> computes a number greater than the prime of given prime index

```typescript
const numberGreaterThan7 = getNumberGreaterThanPrime(3);
// numberGreaterThan7 === 8
```

###### isPrime

> checks if given number is prime

```typescript
const isFourPrime = isPrime(4);
// isFourPrime === false
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

###### isPrimeContainer

> checks if given number is prime container

```typescript
const isFourPrimeContainer = isPrimeContainer(4);
// isFourPrimeContainer === true
```
