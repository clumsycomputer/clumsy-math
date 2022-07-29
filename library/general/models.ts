export type RecursiveSpatialStructure<
  InitialSpatialStructureExtension extends Record<string, unknown>,
  BaseSpatialStructureExtension extends Record<string, unknown>,
  SubSpatialStructureExtension extends Record<string, unknown>,
  SubSpatialStructure extends
    | InterposedSpatialStructure<
        BaseSpatialStructureExtension,
        SubSpatialStructureExtension
      >
    | TerminalSpatialStructure<SubSpatialStructureExtension> =
    | InterposedSpatialStructure<
        BaseSpatialStructureExtension,
        SubSpatialStructureExtension
      >
    | TerminalSpatialStructure<SubSpatialStructureExtension>
> = InitialSpatialStructure<
  InitialSpatialStructureExtension,
  BaseSpatialStructureExtension,
  SubSpatialStructureExtension,
  SubSpatialStructure
>;

type InitialSpatialStructure<
  InitialSpatialStructureExtension extends Record<string, unknown>,
  BaseSpatialStructureExtension extends Record<string, unknown>,
  SubSpatialStructureExtension extends Record<string, unknown>,
  SubSpatialStructure extends
    | InterposedSpatialStructure<
        BaseSpatialStructureExtension,
        SubSpatialStructureExtension
      >
    | TerminalSpatialStructure<SubSpatialStructureExtension>
> = RecursiveSpatialStructureBase<
  "initial",
  InitialSpatialStructureExtension &
    BaseSpatialStructureBase<
      BaseSpatialStructureExtension,
      SubSpatialStructureExtension,
      SubSpatialStructure
    >
>;

type InterposedSpatialStructure<
  BaseSpatialStructureExtension extends Record<string, unknown>,
  SubSpatialStructureExtension extends Record<string, unknown>
> = RecursiveSpatialStructureBase<
  "interposed",
  BaseSpatialStructureExtension & SubSpatialStructureExtension
>;

type TerminalSpatialStructure<
  SubSpatialStructureExtension extends Record<string, unknown>
> = RecursiveSpatialStructureBase<"terminal", SubSpatialStructureExtension>;

type BaseSpatialStructureBase<
  BaseSpatialStructureExtension extends Record<string, unknown>,
  SubSpatialStructureExtension extends Record<string, unknown>,
  SubSpatialStructure extends
    | InterposedSpatialStructure<
        BaseSpatialStructureExtension,
        SubSpatialStructureExtension
      >
    | TerminalSpatialStructure<SubSpatialStructureExtension>
> = BaseSpatialStructureExtension & {
  subStructure: SubSpatialStructure;
};

type RecursiveSpatialStructureBase<
  StructureType extends string,
  StructureExtension extends Record<string, unknown>
> = {
  structureType: StructureType;
} & StructureExtension;
