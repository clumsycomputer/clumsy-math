export function throwInvalidPathError(errorPath: string): never {
  throw new Error(`invalid path: ${errorPath}`);
}
