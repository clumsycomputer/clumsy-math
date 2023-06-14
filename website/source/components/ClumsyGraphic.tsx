import { FunctionalComponent, JSX } from "preact";
import cssModule from "./ClumsyGraphic.module.scss";

export interface UnitGraphicProps<GeometryProps extends object>
  extends Pick<GraphicProps<GeometryProps>, "geometryProps" | "Geometry"> {}

export function UnitGraphic<GeometryProps extends object>(
  props: UnitGraphicProps<GeometryProps>
) {
  const { Geometry, geometryProps } = props;
  return (
    <Graphic
      viewRect={[-1.25, -1.25, 2.5, 2.5]}
      Geometry={Geometry}
      geometryProps={geometryProps}
    />
  );
}

export interface GraphicProps<GeometryProps extends object>
  extends Pick<JSX.HTMLAttributes<SVGElement>, "width" | "height"> {
  geometryProps: GeometryProps;
  Geometry: FunctionalComponent<GeometryProps>;
  viewRect: [x: number, y: number, width: number, height: number];
}

export function Graphic<GeometryProps extends object>(
  props: GraphicProps<GeometryProps>
) {
  const { viewRect, width, height, Geometry, geometryProps } = props;
  return (
    <div className={cssModule.graphicContainer}>
      <svg
        className={cssModule.graphic}
        viewBox={`${viewRect[0]} ${viewRect[1]} ${viewRect[2]} ${viewRect[3]}`}
        width={width}
        height={height}
      >
        <rect
          className={cssModule.graphicBackground}
          x={viewRect[0]}
          y={viewRect[1]}
          width={viewRect[2]}
          height={viewRect[3]}
        />
        <Geometry {...geometryProps} />
      </svg>
    </div>
  );
}

export interface GraphicDisplayProps<DisplayGraphicProps extends object> {
  graphicLabel: string;
  DisplayGraphic: FunctionalComponent<DisplayGraphicProps>;
  displayGraphicProps: DisplayGraphicProps;
}

export function GraphicDisplay<DisplayGraphicProps extends object>(
  props: GraphicDisplayProps<DisplayGraphicProps>
) {
  const { graphicLabel, DisplayGraphic, displayGraphicProps } = props;
  return (
    <div className={cssModule.displayContainer}>
      <div className={cssModule.graphicLabel}>{graphicLabel}</div>
      <div className={cssModule.displayGraphicContainer}>
        <DisplayGraphic {...displayGraphicProps} />
      </div>
    </div>
  );
}
