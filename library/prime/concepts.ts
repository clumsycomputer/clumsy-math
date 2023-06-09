/**
 * a natural number greater than one whose factors are one and itself
 *
 * @example
 * ```typescript
 * const prime = 5 // 5 * 1
 * const notPrime = 4 // 2 * 2, 4 * 1
 * ```
 */
export type _PRIME_CONCEPT = never;

/**
 * a natural number where both it's immediate neighbors are prime
 *
 * @example
 * ```typescript
 * const containerA = 6 // 5 & 7
 * const containerB = 12 // 11 & 13
 * ```
 */
export type _PRIME_CONTAINER_CONCEPT = never;

/**
 * the set of primes bounded by adjacent prime containers
 */
export type _PRIME_TRIBE_CONCEPT = never;
