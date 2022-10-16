import { ExtractInterposedStructure } from "../general";
import { Circle, LoopPoint, LoopStructure, Point2 } from "./encodings";
import { getCirclePoint } from "./getCirclePoint";
import { getRotatedPoint, getUnitRotatedPoint } from "./getRotatedPoint";

export interface GetLoopPointApi {
  someLoopStructure: LoopStructure;
  inputAngle: number;
}

export function getLoopPoint(api: GetLoopPointApi): LoopPoint {
  const { inputAngle, someLoopStructure } = api;
  return _getLoopPoint({
    inputAngle,
    baseStructure: someLoopStructure,
    baseCircle: someLoopStructure.loopBase,
  });
}

interface _GetLoopPointApi extends Pick<GetLoopPointApi, "inputAngle"> {
  baseCircle: Circle;
  baseStructure:
    | GetLoopPointApi["someLoopStructure"]
    | ExtractInterposedStructure<GetLoopPointApi["someLoopStructure"]>;
}

function _getLoopPoint(api: _GetLoopPointApi): LoopPoint {
  const { baseStructure, inputAngle, baseCircle } = api;
  const { unitSubLoopPoint } = getUnitSubLoopPoint({
    baseStructure,
    inputAngle,
  });
  const { unitBaseCirclePoint } = getUnitBaseCirclePoint({
    unitSubLoopPoint,
  });
  const orientedUnitOrigin = getUnitRotatedPoint({
    rotationAngle: baseStructure.subStructure.subOrientation,
    subjectPoint: unitSubLoopPoint[2],
  });
  return [
    ...getOrientedRotatedScaledTranslatedPoint({
      baseStructure,
      baseCircle,
      orientedUnitOrigin,
      subjectUnitPoint: [unitBaseCirclePoint[0], unitSubLoopPoint[1]],
    }),
    getScaledTranslatedPoint({
      baseCircle,
      subjectUnitPoint: orientedUnitOrigin,
    }),
    getOrientedRotatedScaledTranslatedPoint({
      baseStructure,
      baseCircle,
      orientedUnitOrigin,
      subjectUnitPoint: unitSubLoopPoint[3],
    }),
    getOrientedRotatedScaledTranslatedPoint({
      baseStructure,
      baseCircle,
      orientedUnitOrigin,
      subjectUnitPoint: unitBaseCirclePoint,
    }),
  ];
}

interface GetUnitSubLoopPointApi
  extends Pick<_GetLoopPointApi, "inputAngle" | "baseStructure"> {}

function getUnitSubLoopPoint(api: GetUnitSubLoopPointApi) {
  const { baseStructure, inputAngle } = api;
  const { unitSubCircle } = getUnitSubCircle({
    relativeSubRadius: baseStructure.subStructure.relativeSubRadius,
    relativeSubDepth: baseStructure.subStructure.relativeSubDepth,
    subPhase: baseStructure.subStructure.subPhase,
  });
  const unitSubLoopPoint =
    baseStructure.subStructure.structureType === "interposed"
      ? _getLoopPoint({
          inputAngle,
          baseCircle: unitSubCircle,
          baseStructure: baseStructure.subStructure,
        })
      : getTerminalUnitSubLoopPoint({
          inputAngle,
          unitSubCircle,
        });
  return {
    unitSubLoopPoint,
  };
}

interface GetUnitSubCircleApi
  extends Pick<
    _GetLoopPointApi["baseStructure"]["subStructure"],
    "relativeSubRadius" | "relativeSubDepth" | "subPhase"
  > {}

function getUnitSubCircle(api: GetUnitSubCircleApi) {
  const { relativeSubRadius, relativeSubDepth, subPhase } = api;
  const adjustedRelativeSubRadius =
    relativeSubRadius === 0
      ? 0.000000000001
      : relativeSubRadius === 1
      ? 0.999999999999
      : relativeSubRadius;
  const adjustedRelativeSubDepth =
    relativeSubDepth === 0
      ? 0.000000000001
      : relativeSubDepth === 1
      ? 0.999999999999
      : relativeSubDepth;
  const subCircleRadius = adjustedRelativeSubRadius;
  const maxSubCircleDepth = 1 - subCircleRadius;
  const subCircleDepth = adjustedRelativeSubDepth * maxSubCircleDepth;
  const unitSubCircle: Circle = {
    radius: subCircleRadius,
    center: [
      subCircleDepth * Math.cos(subPhase),
      subCircleDepth * Math.sin(subPhase),
    ],
  };
  return {
    unitSubCircle,
  };
}

interface GetTerminalUnitSubLoopPointApi
  extends Pick<GetUnitSubLoopPointApi, "inputAngle">,
    Pick<ReturnType<typeof getUnitSubCircle>, "unitSubCircle"> {}

function getTerminalUnitSubLoopPoint(api: GetTerminalUnitSubLoopPointApi) {
  const { unitSubCircle, inputAngle } = api;
  const unitSubCirclePoint = getCirclePoint({
    someCircle: unitSubCircle,
    pointAngle: inputAngle,
  });
  const terminalUnitSubLoopPoint: LoopPoint = [
    ...unitSubCirclePoint,
    unitSubCircle.center,
    unitSubCirclePoint,
    [NaN, NaN],
  ];
  return terminalUnitSubLoopPoint;
}

interface GetUnitBaseCirclePointApi
  extends Pick<ReturnType<typeof getUnitSubLoopPoint>, "unitSubLoopPoint"> {}

function getUnitBaseCirclePoint(api: GetUnitBaseCirclePointApi) {
  const { unitSubLoopPoint } = api;
  const deltaX = unitSubLoopPoint[2][0] - unitSubLoopPoint[0];
  const otherDeltaX = unitSubLoopPoint[0] - unitSubLoopPoint[2][0];
  const deltaY = unitSubLoopPoint[2][1] - unitSubLoopPoint[1];
  const otherDeltaY = unitSubLoopPoint[1] - unitSubLoopPoint[2][1];
  const squaredDeltaX = deltaX * deltaX;
  const squaredDeltaY = deltaY * deltaY;
  const squaredDeltaAdded = squaredDeltaX + squaredDeltaY;
  const exprA =
    (unitSubLoopPoint[2][0] * unitSubLoopPoint[2][0] -
      unitSubLoopPoint[2][0] * unitSubLoopPoint[0] +
      unitSubLoopPoint[2][1] * deltaY) /
    squaredDeltaAdded;
  const exprB =
    unitSubLoopPoint[2][1] * unitSubLoopPoint[0] -
    unitSubLoopPoint[2][0] * unitSubLoopPoint[1];
  const exprC =
    Math.sqrt(1 - (exprB * exprB) / squaredDeltaAdded) /
    Math.sqrt(squaredDeltaAdded);
  const unitBaseCirclePoint: Point2 = [
    unitSubLoopPoint[2][0] - deltaX * exprA + otherDeltaX * exprC,
    unitSubLoopPoint[2][1] + otherDeltaY * exprA + otherDeltaY * exprC,
  ];
  return {
    unitBaseCirclePoint,
  };
}

interface GetOrientedRotatedScaledTranslatedPointApi
  extends Pick<_GetLoopPointApi, "baseCircle" | "baseStructure"> {
  orientedUnitOrigin: Point2;
  subjectUnitPoint: Point2;
}

function getOrientedRotatedScaledTranslatedPoint(
  api: GetOrientedRotatedScaledTranslatedPointApi
): Point2 {
  const { subjectUnitPoint, baseStructure, orientedUnitOrigin, baseCircle } =
    api;
  const orientedUnitPoint = getUnitRotatedPoint({
    subjectPoint: subjectUnitPoint,
    rotationAngle: baseStructure.subStructure.subOrientation,
  });
  const rotatedUnitPoint = getRotatedPoint({
    subjectPoint: orientedUnitPoint,
    anchorPoint: orientedUnitOrigin,
    rotationAngle: baseStructure.loopRotation,
  });
  return getScaledTranslatedPoint({
    baseCircle,
    subjectUnitPoint: rotatedUnitPoint,
  });
}

interface GetScaledTranslatedPointApi
  extends Pick<_GetLoopPointApi, "baseCircle"> {
  subjectUnitPoint: Point2;
}

function getScaledTranslatedPoint(api: GetScaledTranslatedPointApi): Point2 {
  const { baseCircle, subjectUnitPoint } = api;
  return [
    baseCircle.radius * subjectUnitPoint[0] + baseCircle.center[0],
    baseCircle.radius * subjectUnitPoint[1] + baseCircle.center[1],
  ];
}
