import {
  ANGLE_LOOKUP_INDEX_SCALAR,
  COS_LOOKUP_TABLE,
  SIN_LOOKUP_TABLE,
} from "./constants";
import { LoopPoint, LoopStructure } from "./encodings";

export function loopPoint(
  loopStructure: LoopStructure,
  inputAngle: number
): LoopPoint {
  let subCircleDepth: number,
    subCircleX: number,
    subCircleY: number,
    subPointX: number,
    subPointY: number,
    originX: number,
    originY: number,
    terminalPointX: number,
    terminalPointY: number,
    basePointX: number,
    basePointY: number,
    deltaX: number,
    deltaY: number,
    squaredDeltaAdded: number,
    exprA: number,
    exprB: number,
    exprC: number,
    orientationCos: number,
    orientationSin: number,
    rotationCos: number,
    rotationSin: number,
    rotateDeltaX: number,
    rotateDeltaY: number = NaN;
  const pointResult: LoopPoint = new Float64Array(8) as unknown as LoopPoint;
  const lastLayerIndex = loopStructure.length - 1;
  let angleLookupIndex = (inputAngle * ANGLE_LOOKUP_INDEX_SCALAR) | 0;
  const inputCos = COS_LOOKUP_TABLE[angleLookupIndex]!;
  const inputSin = SIN_LOOKUP_TABLE[angleLookupIndex]!;
  for (let layerIndex = lastLayerIndex; layerIndex > -1; --layerIndex) {
    subCircleDepth =
      loopStructure[layerIndex]![1] * (1 - loopStructure[layerIndex]![0]);
    angleLookupIndex =
      (loopStructure[layerIndex]![2] * ANGLE_LOOKUP_INDEX_SCALAR) | 0;
    subCircleX = subCircleDepth * COS_LOOKUP_TABLE[angleLookupIndex]!;
    subCircleY = subCircleDepth * SIN_LOOKUP_TABLE[angleLookupIndex]!;
    if (layerIndex === lastLayerIndex) {
      subPointX = loopStructure[layerIndex]![0] * inputCos + subCircleX;
      subPointY = loopStructure[layerIndex]![0] * inputSin + subCircleY;
      terminalPointX = subPointX;
      terminalPointY = subPointY;
      originX = subCircleX;
      originY = subCircleY;
    } else {
      subPointX = loopStructure[layerIndex]![0] * pointResult[0] + subCircleX;
      subPointY = loopStructure[layerIndex]![0] * pointResult[1] + subCircleY;
      terminalPointX =
        loopStructure[layerIndex]![0] * pointResult[4] + subCircleX;
      terminalPointY =
        loopStructure[layerIndex]![0] * pointResult[5] + subCircleY;
      originX = loopStructure[layerIndex]![0] * pointResult[6] + subCircleX;
      originY = loopStructure[layerIndex]![0] * pointResult[7] + subCircleY;
    }
    deltaX = originX - subPointX;
    deltaY = originY - subPointY;
    squaredDeltaAdded = deltaX * deltaX + deltaY * deltaY;
    exprA =
      (originX * originX - originX * subPointX + originY * deltaY) /
      squaredDeltaAdded;
    exprB = originY * subPointX - originX * subPointY;
    exprC =
      Math.sqrt(1 - (exprB * exprB) / squaredDeltaAdded) /
      Math.sqrt(squaredDeltaAdded);
    basePointX = originX - deltaX * exprA - deltaX * exprC;
    basePointY = originY - deltaY * exprA - deltaY * exprC;
    angleLookupIndex =
      (loopStructure[layerIndex]![3] * ANGLE_LOOKUP_INDEX_SCALAR) | 0;
    orientationCos = COS_LOOKUP_TABLE[angleLookupIndex]!;
    orientationSin = SIN_LOOKUP_TABLE[angleLookupIndex]!;
    pointResult[0] = basePointX * orientationCos - subPointY * orientationSin;
    pointResult[1] = basePointX * orientationSin + subPointY * orientationCos;
    pointResult[2] = basePointX * orientationCos - basePointY * orientationSin;
    pointResult[3] = basePointX * orientationSin + basePointY * orientationCos;
    pointResult[4] =
      terminalPointX * orientationCos - terminalPointY * orientationSin;
    pointResult[5] =
      terminalPointX * orientationSin + terminalPointY * orientationCos;
    pointResult[6] = originX * orientationCos - originY * orientationSin;
    pointResult[7] = originX * orientationSin + originY * orientationCos;
    angleLookupIndex =
      (loopStructure[layerIndex]![4] * ANGLE_LOOKUP_INDEX_SCALAR) | 0;
    rotationCos = COS_LOOKUP_TABLE[angleLookupIndex]!;
    rotationSin = SIN_LOOKUP_TABLE[angleLookupIndex]!;
    rotateDeltaX = pointResult[0] - pointResult[6];
    rotateDeltaY = pointResult[1] - pointResult[7];
    pointResult[0] =
      rotateDeltaX * rotationCos - rotateDeltaY * rotationSin + pointResult[6];
    pointResult[1] =
      rotateDeltaX * rotationSin + rotateDeltaY * rotationCos + pointResult[7];
    rotateDeltaX = pointResult[2] - pointResult[6];
    rotateDeltaY = pointResult[3] - pointResult[7];
    pointResult[2] =
      rotateDeltaX * rotationCos - rotateDeltaY * rotationSin + pointResult[6];
    pointResult[3] =
      rotateDeltaX * rotationSin + rotateDeltaY * rotationCos + pointResult[7];
    rotateDeltaX = pointResult[4] - pointResult[6];
    rotateDeltaY = pointResult[5] - pointResult[7];
    pointResult[4] =
      rotateDeltaX * rotationCos - rotateDeltaY * rotationSin + pointResult[6];
    pointResult[5] =
      rotateDeltaX * rotationSin + rotateDeltaY * rotationCos + pointResult[7];
  }
  return pointResult;
}
