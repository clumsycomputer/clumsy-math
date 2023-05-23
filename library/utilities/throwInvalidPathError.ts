export function throwInvalidPathError(errorMessage: string): never {
  throw new Error(`invalid path: ${errorMessage}`);
}
