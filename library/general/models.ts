export type RecursiveSpatialStructure<
  InitialSpatialStructureExtension extends Record<string, unknown>,
  BaseSpatialStructureExtension extends Record<string, unknown>,
  SubSpatialStructureExtension extends Record<string, unknown>
> = InitialSpatialStructure<
  InitialSpatialStructureExtension,
  BaseSpatialStructureExtension,
  SubSpatialStructureExtension
>;

type InitialSpatialStructure<
  InitialSpatialStructureExtension extends Record<string, unknown>,
  BaseSpatialStructureExtension extends Record<string, unknown>,
  SubSpatialStructureExtension extends Record<string, unknown>
> = RecursiveSpatialStructureBase<
  "initial",
  InitialSpatialStructureExtension &
    BaseSpatialStructureBase<
      BaseSpatialStructureExtension,
      SubSpatialStructureExtension
    >
>;

type InterposedSpatialStructure<
  BaseSpatialStructureExtension extends Record<string, unknown>,
  SubSpatialStructureExtension extends Record<string, unknown>
> = RecursiveSpatialStructureBase<
  "interposed",
  SubSpatialStructureExtension &
    BaseSpatialStructureBase<
      BaseSpatialStructureExtension,
      SubSpatialStructureExtension
    >
>;

type TerminalSpatialStructure<
  SubSpatialStructureExtension extends Record<string, unknown>
> = RecursiveSpatialStructureBase<"terminal", SubSpatialStructureExtension>;

type BaseSpatialStructureBase<
  BaseSpatialStructureExtension extends Record<string, unknown>,
  SubSpatialStructureExtension extends Record<string, unknown>
> = BaseSpatialStructureExtension & {
  subStructure:
    | InterposedSpatialStructure<
        BaseSpatialStructureExtension,
        SubSpatialStructureExtension
      >
    | TerminalSpatialStructure<SubSpatialStructureExtension>;
};

type RecursiveSpatialStructureBase<
  StructureType extends string,
  StructureExtension extends Record<string, unknown>
> = {
  structureType: StructureType;
} & StructureExtension;

export type ExtractInitialStructure<
  SomeRecursiveSpatialStructure extends RecursiveSpatialStructure<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >
> = ExtractSpatialStructure<"initial", SomeRecursiveSpatialStructure>;

export type ExtractInterposedStructure<
  SomeRecursiveSpatialStructure extends RecursiveSpatialStructure<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >
> = ExtractSpatialStructure<"interposed", SomeRecursiveSpatialStructure>;

export type ExtractTerminalStructure<
  SomeRecursiveSpatialStructure extends RecursiveSpatialStructure<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >
> = Exclude<
  SomeRecursiveSpatialStructure["subStructure"],
  ExtractInterposedStructure<SomeRecursiveSpatialStructure>
>;

export type ExtractBaseStructure<
  SomeRecursiveSpatialStructure extends RecursiveSpatialStructure<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >
> = SomeRecursiveSpatialStructure extends RecursiveSpatialStructureBase<
  "initial",
  BaseSpatialStructureBase<infer BaseStructure, Record<string, unknown>>
>
  ? BaseStructure
  : never;

type ExtractSpatialStructure<
  TargetStructureType extends SomeStructureType,
  SomeSpatialStructure extends RecursiveSpatialStructureBase<
    SomeStructureType,
    Record<string, unknown>
  >,
  SomeStructureType extends
    | RecursiveSpatialStructure<
        Record<string, unknown>,
        Record<string, unknown>,
        Record<string, unknown>
      >["structureType"]
    | RecursiveSpatialStructure<
        Record<string, unknown>,
        Record<string, unknown>,
        Record<string, unknown>
      >["subStructure"]["structureType"] =
    | RecursiveSpatialStructure<
        Record<string, unknown>,
        Record<string, unknown>,
        Record<string, unknown>
      >["structureType"]
    | RecursiveSpatialStructure<
        Record<string, unknown>,
        Record<string, unknown>,
        Record<string, unknown>
      >["subStructure"]["structureType"]
> = SomeSpatialStructure extends RecursiveSpatialStructureBase<
  TargetStructureType,
  infer TargetStructureExtension
>
  ? RecursiveSpatialStructureBase<TargetStructureType, TargetStructureExtension>
  : SomeSpatialStructure extends BaseSpatialStructureBase<
      Record<string, unknown>,
      Record<string, unknown>
    >
  ? ExtractSpatialStructure<
      TargetStructureType,
      SomeSpatialStructure["subStructure"]
    >
  : never;
