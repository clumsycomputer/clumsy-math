/**
 * defacto encoding for {@link _RHYTHM_CONCEPT}
 *
 * @attributes
 * domain: rhythm | category: encoding | name: Rhythm
 */
export interface Rhythm {
  resolution: RhythmResolution;
  points: Array<RhythmPoint>;
}

/**
 * {@link _EUCLID_RHYTHM_CONCEPT} as {@link Rhythm}
 *
 * @attributes
 * domain: rhythm | category: encoding | name: EuclidRhythm
 */
export type EuclidRhythm = Rhythm;

/**
 * {@link _RECURSIVE_EUCLID_RHYTHM_CONCEPT} as {@link Rhythm}
 *
 * @attributes
 * domain: rhythm | category: encoding | name: RecursiveEuclidRhythm
 */
export type RecursiveEuclidRhythm = Rhythm;

/**
 * {@link _ALIGNED_RECURSIVE_EUCLID_RHYTHM_CONCEPT} as {@link RecursiveEuclidRhythm}
 *
 * @attributes
 * domain: rhythm | category: encoding | name: AlignedRecursiveEuclidRhythm
 */
export type AlignedRecursiveEuclidRhythm = RecursiveEuclidRhythm;

/**
 * {@link _PHASED_RECURSIVE_EUCLID_RHYTHM_CONCEPT} as {@link RecursiveEuclidRhythm}
 *
 * @attributes
 * domain: rhythm | category: encoding | name: PhasedRecursiveEuclidRhythm
 */
export type PhasedRecursiveEuclidRhythm = RecursiveEuclidRhythm;

/**
 * ergonomic encoding for {@link _RECURSIVE_EUCLID_RHYTHM_CONCEPT}
 *
 * @attributes
 * domain: rhythm | category: encoding | name: RecursiveEuclidRhythmStructure
 */
export type RecursiveEuclidRhythmStructure<
  EuclidRhythmLayer extends Array<number>
> = [RhythmResolution, EuclidRhythmLayer, ...Array<EuclidRhythmLayer>];

/**
 * ergonomic encoding for {@link _ALIGNED_RECURSIVE_EUCLID_RHYTHM_CONCEPT}
 *
 * @attributes
 * domain: rhythm | category: encoding | name: AlignedEuclidRhythmStructure
 */
export type AlignedEuclidRhythmStructure =
  RecursiveEuclidRhythmStructure<AlignedEuclidRhythmLayer>;

export type AlignedEuclidRhythmLayer = [
  density: RhythmDensity,
  orientation: RhythmOrientation
];

/**
 * ergonomic encoding for {@link _PHASED_RECURSIVE_EUCLID_RHYTHM_CONCEPT}
 *
 * @attributes
 * domain: rhythm | category: encoding | name: PhasedEuclidRhythmStructure
 */
export type PhasedEuclidRhythmStructure =
  RecursiveEuclidRhythmStructure<PhasedEuclidRhythmLayer>;

export type PhasedEuclidRhythmLayer = [
  density: RhythmDensity,
  orientation: RhythmOrientation,
  phase: RhythmPhase
];

export type RhythmMap = Array<RhythmSlot>;

export type EuclidRhythmMap = RhythmMap;

export type RhythmString = string;

export type RhythmSlot = boolean;

export type RhythmPoint = number;

export type RhythmResolution = number;

export type RhythmDensity = number;

export type RhythmPhase = number;

export type RhythmOrientation = number;

export type RhythmInterval = number;

export type RelativeRhythmPoint = number;

export type RhythmSlotWeight = number;

export type RhythmPointWeight = number;

export type RhythmWeight = number;

export type RhythmGroupStructure = [
  baseStructure: RhythmGroupBaseStructure,
  memberStructure: RhythmGroupMemberStructure
];

export type RhythmGroupBaseStructure = [
  RhythmResolution,
  ...Array<AlignedEuclidRhythmLayer>
];

export type RhythmGroupMemberStructure = [
  RhythmDensity,
  ...Array<RhythmDensity>
];
