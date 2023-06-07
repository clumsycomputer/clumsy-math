export const LOOP_ONE = 0.999999999999;

export const LOOP_ZERO = 0.000000000001;

export const { ANGLE_LOOKUP_INDEX_SCALAR, COS_LOOKUP_TABLE, SIN_LOOKUP_TABLE } =
  getTrignometricLookupTables({
    lookupTableResolution: Math.pow(2, 12),
  });

export interface GetTrignometricLookupTablesApi {
  lookupTableResolution: number;
}

function getTrignometricLookupTables(api: GetTrignometricLookupTablesApi) {
  const { lookupTableResolution } = api;
  const lookupAngleStep = (2 * Math.PI) / lookupTableResolution;
  const ANGLE_LOOKUP_INDEX_SCALAR = lookupTableResolution / (2 * Math.PI);
  const COS_LOOKUP_TABLE = new Float64Array(lookupTableResolution);
  const SIN_LOOKUP_TABLE = new Float64Array(lookupTableResolution);
  for (let i = 0; i < lookupTableResolution; i++) {
    const lookupAngle = i * lookupAngleStep;
    COS_LOOKUP_TABLE[i] = Math.cos(lookupAngle);
    SIN_LOOKUP_TABLE[i] = Math.sin(lookupAngle);
  }
  return {
    ANGLE_LOOKUP_INDEX_SCALAR,
    COS_LOOKUP_TABLE,
    SIN_LOOKUP_TABLE,
  };
}
