# clumsy-math

a little library of helpful math utensils 🙂

## installation

```bash
yarn add clumsy-math
```

## documentation

- **[spacer _(concepts)_](#spacer-concepts)**

- **[spacer _(encodings)_](#spacer-encodings)**

- **[spacer _(functions)_](#spacer-functions)**

## spacer _(concepts)_

###### aligned recursive euclid spacer

> a recursive euclid spacer where each layer has a point at the zero slot

###### basic euclid spacer

> a euclid spacer that has an orientation and phase of zero (default layout) (most left dense)

###### component spacer

> a recursive euclidean spacer of a recursive euclidean spacer

###### core euclid spacer

> a basic euclid spacer that is reduced to its simplest form

###### euclid spacer

> a spacer whose points are as evenly distributed as possible throughout a discrete space

###### phased recursive euclid spacer

> a recursive euclid spacer where all of the individual layers are phaseable

###### recursive euclid spacer

> a spacer where euclid spacers are stacked on top of one another such that the base spacer's density / points determines the next spacer's resolution / space

###### spacer

> a discrete sequence / cycle of binary values (slots)

###### spacer density

> the number of points in a spacer

###### spacer group

> a set of aligned recursive euclidean spacers that share a static base structure and a dynamic member structure where the density structure is the same but orientations are different

###### spacer interval

> starting at a base point, the distance upto the next point

###### spacer lineage

> all spacer groups an aligned recursive euclidean spacer belongs to

###### spacer orientation

> the offset of an aligned spacer, measured in points, relative to a base spacer

###### spacer phase

> the offset of a spacer, measured in slots, relative to a base spacer

###### spacer point

> the index of a slot whose value is true (1)

###### spacer point weight

> a point's corresponding slot weight

###### spacer relative point

> a point whose value is normalized within the range of [0, 1)

###### spacer resolution

> the number of slots constituting a spacer

###### spacer slot

> the building block of spacer

###### spacer slot weight

> the sum of points at a slot across a set of spacers with the same resolution

###### spacer weight

> the sum of a spacer's point weight

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

###### componentSpacers

> great for destructuring a spacer structure into its constituent spacers

###### coreEuclidMap

> most important spacer function, but rarely invoked by itself

###### coreEuclidSpacer

> great for working with simplified euclid spacers

###### euclidSpacer

> great for working with unlayered euclid spacers

###### orientatedSpacer

> great for reorienting an aligned spacer after it's been created

###### phasedSpacer

> great for phasing a spacer after it's been created

###### relativeSpacerPoints

> great for normalizing spacers across different resolutions

###### spacer

> primary function for working with spacer

###### spacerGroup

> great for defining a set of related spacers at a desired altitude / scope

###### spacerGroupId

> great for logging and working with datasets of spacer groups

###### spacerId

> great for logging and working with datasets of spacer structures

###### spacerIntervals

> great for making calculations between spacer points

###### spacerLineage

> great for getting related spacers at a given altitude / scope / lineageIndex

###### spacerPointWeights

> great for working with a spacer's points in the context of a set of spacers

###### spacerSlotWeights

> great for understanding point distribution across a set of spacers

###### spacerString

> great for logging and visualizing short spacers

###### spacerWeight

> great for differentiating a spacer against a set of spacers

