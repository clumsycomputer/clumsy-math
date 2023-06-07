# clumsy-math

a math library for the clumsy and curious 🙂

## installation

```bash
yarn add clumsy-math
```

## documentation

- **[spacer _(concepts)_](#spacer-concepts)**

- **[spacer _(encodings)_](#spacer-encodings)**

- **[spacer _(functions)_](#spacer-functions)**

- **[prime _(concepts)_](#prime-concepts)**

- **[prime _(functions)_](#prime-functions)**

- **[prime _(encodings)_](#prime-encodings)**

- **[loop _(functions)_](#loop-functions)**

## spacer _(concepts)_

###### aligned recursive euclid spacer

> a recursive euclid spacer where each layer has a point at the zero slot

```typescript
const baseEuclidMap = [true, true, false, true, false]
const terminalEuclidMap = [true, false, true]
const resultEuclidMap = [true, false, false, true, false]
```

###### basic euclid spacer

> a euclid spacer that has an orientation and phase of zero (default layout) (most left dense)

```typescript
const euclidMapA = [true, true, false, true, false] // basic
const euclidMapB = [true, false, true, false, true] // not basic
const euclidMapC = [true, false, true, true, false] // not basic
```

###### component spacer

> a recursive euclidean spacer of a recursive euclidean spacer

```typescript
const baseComponentMap = [true, true, false, true, false]
const interposedComponentMap = [true, false, false, true, false]
const terminalComponentMap = [true, false, false, false, false]
```

###### core euclid spacer

> a basic euclid spacer that is reduced to its simplest form

```typescript
const fullEuclidMap = [true, false, true, false]
const coreEuclidMap = [true, false]
```

###### euclid spacer

> a spacer whose points are as evenly distributed as possible throughout a discrete space

```typescript
const euclidMapA = [true, true, false, true, false]
const euclidMapB = [true, false, true, false, true]
const euclidMapC = [true, false, true, true, false]
```

###### phased recursive euclid spacer

> a recursive euclid spacer where all of the individual layers are phaseable

```typescript
const baseEuclidMap = [true, true, false, true, false]
const terminalEuclidMap = [false, true, true]
const resultEuclidMap = [false, true, false, true, false]
```

###### recursive euclid spacer

> a spacer where euclid spacers are stacked on top of one another such that the base spacer's density / points determines the next spacer's resolution / space

```typescript
const baseEuclidMap = [true, true, false, true, false]
const terminalEuclidMap = [true, true, flase]
const resultEuclidMap = [true, true, false, false, false]
```

###### spacer

> a discrete sequence / cycle of binary values (slots)

```typescript
const spacerString = "1010"
const spacerMap = [true, false, true, false];
const spacer = {
  resolution: 4,
  points: [0, 2]
}
```

###### spacer density

> the number of points in a spacer

```typescript
const spacerMap = [true, true, false, true, false]
const spacerPoints = [0, 1, 3]
const spacerDensity = 3 // spacerPoints.length
```

###### spacer group

> a set of aligned recursive euclidean spacers that share a static base structure and a dynamic member structure where the density structure is the same but orientations are different

```typescript
const groupBase = [true, true, false, true, false]
const groupMapsA = [
  [true, true, false, true, false],
  [true, false, false, true, false],
]
```

###### spacer interval

> starting at a base point, the distance upto the next point

```typescript
const spacerMap = [true, true, false, true, false]
const spacerPoints = [0, 1, 3]
const spacerIntervals = [1, 2, 2]
```

###### spacer lineage

> all spacer groups an aligned recursive euclidean spacer belongs to

```typescript
const spacerMapA = [true, false, false, true, false]
const lineageMapsA = [
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

###### spacer orientation

> the offset of an aligned spacer, measured in points, relative to a base spacer

```typescript
const baseSpacerMap = [true, true, false, true, false]
const spacerOrientation = 2
const reorientedSpacerMap = [true, false, true, true, false]
```

###### spacer phase

> the offset of a spacer, measured in slots, relative to a base spacer

```typescript
const baseSpacerMap = [true, true, false, true, false]
const spacerPhase = -1; // spacerMap.length
const phasedSpacerMap = [false, true, true, false, true]
```

###### spacer point

> the index of a slot whose value is true (1)

```typescript
const spacerMap = [true, true, false, true, false]
const spacerPoints = [0, 1, 3]
```

###### spacer point weight

> a point's corresponding slot weight

```typescript
const spacerMapA = [true, true, false, true, false]; // 1, 1, 0, 1, 0
const spacerMapB = [true, false, true, false, true]; // 1, 0, 1, 0, 1
const spacerMapC = [true, false, true, true, false]; // 1, 0, 1, 1, 0
const groupSlotWeights = [3, 1, 2, 2, 1];
const spacerPointsA = [0, 1, 3]
const spacerPointWeightsA = [3, 1, 2]
```

###### spacer relative point

> a point whose value is normalized within the range of [0, 1)

```typescript
const spacerMap = [true, true, false, true, false]
const spacerPoints = [0, 1, 3]
const relativeSpacerPoints = [0.0, 0.2, 0.6]
```

###### spacer resolution

> the number of slots constituting a spacer

```typescript
const spacerMap = [true, true, false, true, false]
const spacerResolution = 5; // spacerMap.length
```

###### spacer slot

> the building block of spacer

```typescript
const spacerMap = [true, true, false, true, false]
const spacerSlotZero = spacerMap[0] // true
const spacerSlotTwo = spacerMap[2] // false
```

###### spacer slot weight

> the sum of points at a slot across a set of spacers with the same resolution

```typescript
const spacerMapA = [true, true, false, true, false]; // 1, 1, 0, 1, 0
const spacerMapB = [true, false, true, false, true]; // 1, 0, 1, 0, 1
const spacerMapC = [true, false, true, true, false]; // 1, 0, 1, 1, 0
const groupSlotWeights = [3, 1, 2, 2, 1];
const slotWeightZero = 3; // groupSlotWeights[0]
```

###### spacer weight

> the sum of a spacer's point weight

```typescript
const spacerMapA = [true, true, false, true, false]; // 1, 1, 0, 1, 0
const spacerMapB = [true, false, true, false, true]; // 1, 0, 1, 0, 1
const spacerMapC = [true, false, true, true, false]; // 1, 0, 1, 1, 0
const groupSlotWeights = [3, 1, 2, 2, 1];
const spacerPointsA = [0, 1, 3]
const spacerPointWeightsA = [3, 1, 2]
const spacerWeightA = 6 // 3 + 1 + 2
```

## spacer _(encodings)_

###### AlignedEuclidSpacerLayer

> encoding for defining a [AlignedRecursiveEuclidSpacerStructure](#alignedrecursiveeuclidspacerstructure) layer's components

###### AlignedRecursiveEuclidSpacer

> [aligned recursive euclid spacer](#aligned-recursive-euclid-spacer) as [Spacer](#spacer-1)

###### AlignedRecursiveEuclidSpacerStructure

> ergonomic encoding for defining [aligned recursive euclid spacer](#aligned-recursive-euclid-spacer)

###### AlignedSpacerStructure

> compressed alias for [AlignedRecursiveEuclidSpacerStructure](#alignedrecursiveeuclidspacerstructure)

###### BasicEuclidSpacer

> [basic euclid spacer](#basic-euclid-spacer) as [Spacer](#spacer-1)

###### CoreEuclidSpacer

> [core euclid spacer](#core-euclid-spacer) as [Spacer](#spacer-1)

###### EuclidSpacer

> [euclid spacer](#euclid-spacer) as [Spacer](#spacer-1)

###### EuclidSpacerMap

> [euclid spacer](#euclid-spacer) as [SpacerMap](#spacermap)

###### PhasedEuclidSpacerLayer

> encoding for defining a [PhasedRecursiveEuclidSpacerStructure](#phasedrecursiveeuclidspacerstructure) layer's components

###### PhasedRecursiveEuclidSpacer

> [phased recursive euclid spacer](#phased-recursive-euclid-spacer) as [Spacer](#spacer-1)

###### PhasedRecursiveEuclidSpacerStructure

> ergonomic encoding for defining [phased recursive euclid spacer](#phased-recursive-euclid-spacer)

###### PhasedSpacerStructure

> compressed alias for [PhasedRecursiveEuclidSpacerStructure](#phasedrecursiveeuclidspacerstructure)

###### RecursiveEuclidSpacer

> [recursive euclid spacer](#recursive-euclid-spacer) as [Spacer](#spacer-1)

###### RecursiveEuclidSpacerStructure

> useful encoding for either [AlignedRecursiveEuclidSpacerStructure](#alignedrecursiveeuclidspacerstructure) or [PhasedRecursiveEuclidSpacerStructure](#phasedrecursiveeuclidspacerstructure)

###### RelativeSpacerPoint

> a real number in the range of [0, 1)

###### Spacer

> defacto encoding for working with [spacer](#spacer)

###### SpacerDensity

> an integer in the range of [0, spacerResolution]

###### SpacerGroupBaseStructure

> encoding for defining the base structure of a [SpacerGroupStructure](#spacergroupstructure)

###### SpacerGroupMemberStructure

> encoding for defining the member structure of a [SpacerGroupStructure](#spacergroupstructure)

###### SpacerGroupStructure

> ergonomic encoding for defining [spacer group](#spacer-group)

###### SpacerInterval

> an integer in the range of [1, spacerResolution]

###### SpacerMap

> [spacer](#spacer) as Array\<boolean\>

###### SpacerOrientation

> an integer in the range of [0, spacerDensity)

###### SpacerPhase

> an integer in the range of (-spacerResolution, spacerResolution)

###### SpacerPoint

> an integer in the range of [0, spacerResolution)

###### SpacerPointWeight

> an integer in the range of [0, ∞)

###### SpacerResolution

> an integer in the range of [1, ∞)

###### SpacerSlot

> a boolean that's either true or false

###### SpacerSlotWeight

> an integer in the range of [0, ∞)

###### SpacerString

> [spacer](#spacer) as a string of 1's and 0's

###### SpacerWeight

> an integer in the range of [0, ∞)

## spacer _(functions)_

###### basicEuclidSpacer

> great for working with euclid spacers where orientation and phase are not needed

```typescript
const basicSpacerA = basicEuclidSpacer(5, 3)
// basicSpacerA === [5, [0, 1, 3]]
```

###### componentSpacers

> great for destructuring a spacer structure into its constituent spacers

```typescript
const componentsA = spacerComponents([5, [3, 1, 0], [2, 0, 0]])
// const componentsA === [
//   [5, [3, 1, 0]], // baseSpacerStructure
//   [5, [3, 1, 0], [2, 0, 0]]
// ]
```

###### coreEuclidMap

> most important spacer function, but rarely invoked by itself

```typescript
const coreSpacerMapA = coreEuclidMap(5, 3)
// coreSpacerMapA === [true, true, false, true, false]
```

###### coreEuclidSpacer

> great for working with simplified euclid spacers

```typescript
const coreSpacerA = coreEuclidSpacer(8, 4)
// coreSpacerA === [2, [0]]
```

###### euclidSpacer

> great for working with unlayered euclid spacers

```typescript
const spacerA = euclidSpacer(5, 3, 1, 0)
// spacerA === [5, [0, 2, 4]]
```

###### orientatedSpacer

> great for reorienting an aligned spacer after it's been created

```typescript
const spacerA = spacer(5, [3, 1])
const spacerB = orientatedSpacer(spacerA, 1)
// spacerB === [5, [0, 2, 3]]
```

###### phasedSpacer

> great for phasing a spacer after it's been created

```typescript
const spacerA = spacer([5, [3, 1]]),
const  spacerB = phasedSpacer(spacerA, 1)
// spacerB === [5, [1, 3, 4]]
```

###### relativeSpacerPoints

> great for normalizing spacers across different resolutions

```typescript
const relativePointsA = relativeSpacerPoints(
  spacer([5, [3, 1]])
)
// relativePointsA === [0, 0.4, 0.8]
```

###### spacer

> primary function for working with spacer

```typescript
const spacerA = spacer([5, [3, 1, 0]])
// const spacerA === [5, [0, 2, 4]]
```

###### spacerGroup

> great for defining a set of related spacers at a desired altitude / scope

```typescript
const groupA = spacerGroup([[5], [3]])
// groupA === [
//   [5, [3, 0]],
//   [5, [3, 1]],
//   [5, [3, 2]]
// ]
```

###### spacerGroupId

> great for logging and working with datasets of spacer groups

```typescript
const groupIdA = spacerGroupId([[5, [3, 1]], [2]])
// groupIdA === "group___5__3_1___2"
```

###### spacerId

> great for logging and working with datasets of spacer structures

```typescript
const idA = spacerId([5, [3, 1, 0]])
// const idA === "phased__5__3_1_0"
```

###### spacerIntervals

> great for making calculations between spacer points

```typescript
const intervalsA = spacerIntervals(
  spacer([5, [3, 1]])
)
// intervalsA === [2, 2, 1]
```

###### spacerLineage

> great for getting related spacers at a given altitude / scope / lineageIndex

```typescript
const lineageA = spacerLineage([5, [3, 1], [2, 0]])
// lineageA === [
//   [[5], [3, 2]], // high-altitude or zoomed-out
//   [[5, [3, 1]], [2]] // low-altitude or zoomed-in
// ]
```

###### spacerPointWeights

> great for working with a spacer's points in the context of a set of spacers

```typescript
const pointWeightsA = spacerPointWeights(
  spacerSlotWeights([
    spacer([5, [3, 0]]),
    spacer([5, [3, 1]]),
    spacer([5, [3, 2]])
  ]),
  spacer([5, [3, 2]])
)
// const pointWeightsA === [3, 2, 2]
```

###### spacerSlotWeights

> great for understanding point distribution across a set of spacers

```typescript
const slotWeightsA = spacerSlotWeights([
  spacer([5, [3, 0]]),
  spacer([5, [3, 1]]),
  spacer([5, [3, 2]])
])
// slotWeightsA === [3, 1, 2, 2, 1]
```

###### spacerString

> great for logging and visualizing short spacers

```typescript
const stringA = spacerString(
  spacer([5, [3, 1]])
)
// stringA === "10101"
```

###### spacerWeight

> great for differentiating a spacer against a set of spacers

```typescript
const weightA = spacerWeight(
  spacerSlotWeights([
    spacer([5, [3, 0]]),
    spacer([5, [3, 1]]),
    spacer([5, [3, 2]])
  ]),
  spacer([5, [3, 2]])
)
// const weightA === 7
```

## prime _(concepts)_

###### prime

> a natural number greater than one whose factors are one and itself

###### prime container

> a natural number where both it's immediate neighbors are prime

## prime _(functions)_

###### isPrime

> use for checking if some number is prime

###### isPrimeContainer

> use for checking if some number is a prime container

###### prime

> use for getting prime by index

###### primeContainer

> great for organizing primes and who knows what else

###### primeContainerSequence

> use for working with the first n prime containers

###### primeSequence

> use for working with the first n primes

###### primeSequenceInclusive

> use for getting all primes less than some number

## prime _(encodings)_

###### Prime

> [prime](#prime) as number

###### PrimeContainer

> [prime container](#prime-container) as number

## loop _(functions)_

###### loopCosine

> great for generating cosine waves of a loop

###### loopPendulum

> great for generating pendulum waves of a loop

###### loopSine

> great for generating sine waves of a loop

