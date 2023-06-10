import { ComponentChildren, FunctionalComponent } from "preact";
import cssModule from "./ClumsyGraphic.module.scss";

export interface ClumsyGraphicProps<GeometryProps extends object> {
  geometryProps: GeometryProps;
  Geometry: FunctionalComponent<GeometryProps>;
}

export function ClumsyGraphic<GeometryProps extends object>(
  props: ClumsyGraphicProps<GeometryProps>
) {
  const { Geometry, geometryProps } = props;
  const viewRect = { x: -1.25, y: -1.25, size: 2.5 };
  return (
    <div className={cssModule.graphicContainer}>
      <svg
        viewBox={`${viewRect.x} ${viewRect.y} ${viewRect.size} ${viewRect.size}`}
      >
        <rect
          className={cssModule.graphicBackground}
          x={viewRect.x}
          y={viewRect.y}
          width={viewRect.size}
          height={viewRect.size}
        />
        <Geometry {...geometryProps} />
      </svg>
    </div>
  );
}

export interface ClumsyGraphicItemProps {
  itemLabel: string;
  children: ComponentChildren;
}

export function ClumsyGraphicItem(props: ClumsyGraphicItemProps) {
  const { itemLabel, children } = props;
  return (
    <div className={cssModule.graphicItemContainer}>
      <div className={cssModule.graphicItemLabel}>{itemLabel}</div>
      {children}
    </div>
  );
}
