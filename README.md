# clumsy-math

a math library for the clumsy and curious 🙂

## documentation

- **[rhythm _(concepts)_](#rhythm-concepts)**

## rhythm _(concepts)_

###### rhythm

> a discrete sequence / cycle of binary values

```typescript
const rhythm = [true, true, false, true, false];
```

###### rhythm density

> the number of points in a rhythm

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPoints = [0, 1, 3];
const rhythmDensity = 3; // rhythmPoints.length
```

###### rhythm orientation

> the offset of a rhythm, measured in slots, relative to a base rhythm

```typescript
const orientationA = 0;
const rhythmA = [true, true, false, true, false];
const orientationB = 1;
const rhythmB = [true, false, true, false, true];
```

###### rhythm phase

> the offset of a rhythm, measured in slots, relative to a base rhythm

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPhase = -1;
const phasedRhythm = [false, true, true, false, true];
```

###### rhythm point

> the index of a slot whose value is true (1)

```typescript
const rhythm = [true, true, false, true, false];
const rhythmPoints = [0, 1, 3];
```

###### rhythm resolution

> the number of slots in a rhythm

```typescript
const rhythm = [true, true, false, true, false];
const rhythmResolution = 5; // rhythm.length
```

###### rhythm slot

> a rhythm's building block

```ts
const rhythm = [true, true, false, true, false];
const rhythmSlotZero = true; // rhythm[0]
const rhythmSlotTwo = false; // rhythm[2]
```

<sup><i>&emsp;[rhythm](todo)</i></sup>

<sup><i>&emsp;[RhythmSlot](todo)</i></sup>


