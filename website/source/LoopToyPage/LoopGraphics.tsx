import {
  LoopPendulum,
  LoopPoint,
  LoopSine,
  LoopStructure,
  loopPendulum,
  loopPoint,
  loopSine,
} from "clumsy-math";
import { Fragment } from "preact";
import { useMemo } from "preact/hooks";
import { UnitGraphic, GraphicDisplay } from "../components/ClumsyGraphic";
import cssModule from "./LoopGraphics.module.scss";
import { LoopToyState } from "./LoopToyPage";

export interface LoopGraphicsProps {
  loopToyState: LoopToyState;
}

export function LoopGraphics(props: LoopGraphicsProps) {
  const { loopToyState } = props;
  const { loopGeometry } = useLoopGeometry({
    loopToyState,
  });
  return (
    <div className={cssModule.graphicList}>
      <GraphicDisplay
        graphicLabel={"shape"}
        DisplayGraphic={ShapeLoopGraphic}
        displayGraphicProps={{ loopToyState, loopGeometry }}
      />
      <GraphicDisplay
        graphicLabel={"sine"}
        DisplayGraphic={SineLoopGraphic}
        displayGraphicProps={{ loopGeometry }}
      />
      <GraphicDisplay
        graphicLabel={"pendulum"}
        DisplayGraphic={PendulumLoopGraphic}
        displayGraphicProps={{ loopGeometry }}
      />
    </div>
  );
}

interface UseLoopGraphicDataApi
  extends Pick<LoopGraphicsProps, "loopToyState"> {}

function useLoopGeometry(api: UseLoopGraphicDataApi) {
  const { loopToyState } = api;
  return useMemo(() => {
    const pointCount = 256;
    const resultLoopPoints: Array<LoopPoint> = [];
    const resultLoopSines: Array<LoopSine> = [];
    const resultLoopPendulums: Array<LoopPendulum> = [];
    let resultMaxSizeLoopSine = 0;
    let resultMaxSizeLoopPendulum = 0;
    const inputAngleStep = (2 * Math.PI) / pointCount;
    for (let pointIndex = 0; pointIndex < pointCount; pointIndex++) {
      const pointInputAngle = pointIndex * inputAngleStep;
      const currentLoopPoint = loopPoint(
        loopToyState.loopStructure,
        pointInputAngle
      );
      const currentLoopSine = loopSine(currentLoopPoint);
      const currentLoopPendulum = loopPendulum(currentLoopPoint);
      resultLoopPoints.push(currentLoopPoint);
      resultLoopSines.push(currentLoopSine);
      resultLoopPendulums.push(currentLoopPendulum);
      resultMaxSizeLoopSine = Math.max(
        resultMaxSizeLoopSine,
        Math.abs(currentLoopSine)
      );
      resultMaxSizeLoopPendulum = Math.max(
        resultMaxSizeLoopPendulum,
        Math.abs(currentLoopPendulum)
      );
    }
    return {
      loopGeometry: {
        loopPoints: resultLoopPoints,
        loopSines: resultLoopSines,
        loopPendulums: resultLoopPendulums,
        maxSizeLoopSine: resultMaxSizeLoopSine,
        maxSizeLoopPendulum: resultMaxSizeLoopPendulum,
      },
    };
  }, [loopToyState]);
}

interface PendulumLoopGraphicProps
  extends Pick<ReturnType<typeof useLoopGeometry>, "loopGeometry"> {}

function PendulumLoopGraphic(props: PendulumLoopGraphicProps) {
  return (
    <UnitGraphic
      geometryProps={props}
      Geometry={({ loopGeometry }) => (
        <polyline
          className={cssModule.wavePath}
          points={loopGeometry.loopPendulums
            .map(
              (currentLoopPendulum, pointIndex) =>
                `${(2 / loopGeometry.loopPendulums.length) * pointIndex - 1},${
                  currentLoopPendulum / loopGeometry.maxSizeLoopPendulum
                }`
            )
            .join(" ")}
        />
      )}
    />
  );
}

interface SineLoopGraphicProps
  extends Pick<ReturnType<typeof useLoopGeometry>, "loopGeometry"> {}

function SineLoopGraphic(props: SineLoopGraphicProps) {
  return (
    <UnitGraphic
      geometryProps={props}
      Geometry={({ loopGeometry }) => (
        <polyline
          className={cssModule.wavePath}
          points={loopGeometry.loopSines
            .map(
              (currentLoopSine, pointIndex) =>
                `${(2 / loopGeometry.loopSines.length) * pointIndex - 1},${
                  currentLoopSine / loopGeometry.maxSizeLoopSine
                }`
            )
            .join(" ")}
        />
      )}
    />
  );
}

interface ShapeLoopGraphicProps
  extends Pick<LoopGraphicsProps, "loopToyState">,
    Pick<ReturnType<typeof useLoopGeometry>, "loopGeometry"> {}

function ShapeLoopGraphic(props: ShapeLoopGraphicProps) {
  return <UnitGraphic Geometry={ShapeGeometry} geometryProps={props} />;
}

interface ShapeGeometryProps extends ShapeLoopGraphicProps {}

function ShapeGeometry(props: ShapeGeometryProps) {
  const { loopToyState, loopGeometry } = props;
  const { loopCircles, loopPolygonPoints } = useMemo(() => {
    const { resultLoopCircles } = loopToyState.loopStructure.reduce<{
      currentLoopStructure: LoopStructure;
      resultLoopCircles: Array<{
        radius: number;
        centerX: number;
        centerY: number;
      }>;
    }>(
      (resultData, currentLoopLayer) => {
        const { currentLoopStructure, resultLoopCircles } = resultData;
        currentLoopStructure.push(currentLoopLayer);
        const currentLoopPoint = loopPoint(currentLoopStructure, 0);
        resultLoopCircles.unshift({
          radius: resultLoopCircles[0]!.radius * currentLoopLayer[0],
          centerX: currentLoopPoint[6],
          centerY: currentLoopPoint[7],
        });
        return resultData;
      },
      {
        currentLoopStructure: [],
        resultLoopCircles: [{ radius: 1, centerX: 0, centerY: 0 }],
      }
    );
    return {
      loopCircles: resultLoopCircles,
      loopPolygonPoints: loopGeometry.loopPoints.reduce(
        (resultPolygonPoints, currentLoopPoint) =>
          `${resultPolygonPoints}${currentLoopPoint[0]},${currentLoopPoint[1]} `,
        ""
      ),
    };
  }, [loopGeometry]);
  return (
    <Fragment>
      <circle
        className={cssModule.shapeOriginPoint}
        cx={loopCircles[0]!.centerX}
        cy={loopCircles[0]!.centerY}
        r={0.015}
      />
      {loopCircles.map((someLayerCircle) => (
        <circle
          className={cssModule.shapeStructureCircle}
          cx={someLayerCircle.centerX}
          cy={someLayerCircle.centerY}
          r={someLayerCircle.radius}
        />
      ))}
      <polygon
        className={cssModule.shapeLoopPolygon}
        points={loopPolygonPoints}
      />
    </Fragment>
  );
}
