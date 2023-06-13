import { Fragment } from "preact/jsx-runtime";
import { ClumsyGraphic, ClumsyGraphicItem } from "../components/ClumsyGraphic";
import cssModule from "./SpacerGraphics.module.scss";
import { useSpacerComponentsData } from "./useSpacerComponentsData";

export interface SpacerGraphicsProps
  extends Pick<
    ReturnType<typeof useSpacerComponentsData>,
    "spacerComponentsData"
  > {}

export function SpacerGraphics(props: SpacerGraphicsProps) {
  const { spacerComponentsData } = props;
  return (
    <div className={cssModule.graphicContainers}>
      <ClumsyGraphicItem itemLabel={"composition"}>
        <SpacerCompositionGraphic spacerComponentsData={spacerComponentsData} />
      </ClumsyGraphicItem>
      <ClumsyGraphicItem itemLabel={"terminal weights"}>
        <SpacerTerminalWeightsGraphic
          spacerComponentsData={spacerComponentsData}
        />
      </ClumsyGraphicItem>
      <ClumsyGraphicItem itemLabel={"symmetric weights"}>
        <SpacerSymmetricWeightsGraphic
          spacerComponentsData={spacerComponentsData}
        />
      </ClumsyGraphicItem>
    </div>
  );
}

interface SpacerCompositionGraphicProps
  extends Pick<SpacerGraphicsProps, "spacerComponentsData"> {}

function SpacerCompositionGraphic(props: SpacerCompositionGraphicProps) {
  const { spacerComponentsData } = props;
  return (
    <ClumsyGraphic
      geometryProps={{ spacerComponentsData }}
      Geometry={CompositionGeometry}
    />
  );
}

interface CompositionGeometryProps
  extends Pick<SpacerCompositionGraphicProps, "spacerComponentsData"> {}

function CompositionGeometry(props: CompositionGeometryProps) {
  const { spacerComponentsData } = props;
  return (
    <Fragment>
      {spacerComponentsData.map((someComponentData, componentIndex) => {
        const cellSize = 2.25 / someComponentData.componentStructure[0];
        const cellSizeHalf = cellSize / 2;
        const cellRadius = cellSizeHalf;
        return someComponentData.componentSpacer[1].map((someSpacerPoint) => {
          const columnIndex = someSpacerPoint;
          const rowIndex = componentIndex;
          return (
            <circle
              r={cellRadius}
              cx={columnIndex * cellSize + cellSizeHalf - 1.125}
              cy={rowIndex * cellSize + cellSizeHalf - 1.125}
              fill={"yellow"}
            />
          );
        });
      })}
    </Fragment>
  );
}

interface SpacerTerminalWeightsGraphicProps
  extends Pick<SpacerCompositionGraphicProps, "spacerComponentsData"> {}

function SpacerTerminalWeightsGraphic(
  props: SpacerTerminalWeightsGraphicProps
) {
  const { spacerComponentsData } = props;
  return (
    <ClumsyGraphic
      geometryProps={{ spacerComponentsData }}
      Geometry={TerminalWeightsGeometry}
    />
  );
}

interface TerminalWeightsGeometryProps
  extends Pick<SpacerTerminalWeightsGraphicProps, "spacerComponentsData"> {}

function TerminalWeightsGeometry(props: TerminalWeightsGeometryProps) {
  const { spacerComponentsData } = props;
  return (
    <Fragment>
      {spacerComponentsData.map((someComponentData) => {
        const cellSize = 2.25 / someComponentData.componentSpacer[0];
        const cellSizeHalf = cellSize / 2;
        return someComponentData.terminalSlotWeights.map(
          (someSlotWeight, slotIndex) => {
            const columnIndex = slotIndex;
            const rowIndex = someComponentData.componentIndex;
            const radiusMax = cellSizeHalf;
            const radiusMin = radiusMax / 4;
            const radiusRange = radiusMax - radiusMin;
            const radiusStep =
              radiusRange / someComponentData.terminalSlotWeights[0]!;
            return someSlotWeight > 0 ? (
              <circle
                r={someSlotWeight * radiusStep + radiusMin}
                cx={columnIndex * cellSize + cellSizeHalf - 1.125}
                cy={rowIndex * cellSize + cellSizeHalf - 1.125}
                fill={"yellow"}
              />
            ) : null;
          }
        );
      })}
    </Fragment>
  );
}

interface SpacerSymmetricWeightsGraphicProps
  extends Pick<SpacerCompositionGraphicProps, "spacerComponentsData"> {}

function SpacerSymmetricWeightsGraphic(
  props: SpacerSymmetricWeightsGraphicProps
) {
  const { spacerComponentsData } = props;
  return (
    <ClumsyGraphic
      geometryProps={{ spacerComponentsData }}
      Geometry={SymmetricWeightsGeometry}
    />
  );
}

interface SymmetricWeightsGeometryProps
  extends Pick<SpacerSymmetricWeightsGraphicProps, "spacerComponentsData"> {}

function SymmetricWeightsGeometry(props: SymmetricWeightsGeometryProps) {
  const { spacerComponentsData } = props;
  const partitionRoot =
    spacerComponentsData.length === 1
      ? 1
      : spacerComponentsData.length <= 4
      ? 2
      : spacerComponentsData.length <= 9
      ? 3
      : spacerComponentsData.length <= 16
      ? 4
      : spacerComponentsData.length <= 25
      ? 5
      : spacerComponentsData.length <= 36
      ? 6
      : spacerComponentsData.length <= 49
      ? 7
      : spacerComponentsData.length <= 64
      ? 8
      : NaN;
  const paddedParitionRoot = partitionRoot / 4 + partitionRoot;
  return (
    <Fragment>
      {spacerComponentsData.map((someComponentData) => {
        const columnIndex = someComponentData.componentIndex % partitionRoot;
        const rowIndex = Math.floor(
          someComponentData.componentIndex / partitionRoot
        );
        const cellSize = 2.25 / partitionRoot;
        const cellSizeHalf = cellSize / 2;
        return someComponentData.symmetricSlotWeights.map(
          (someSlotWeight, slotIndex, currentFullSlotWeights) => {
            const pointAngle =
              ((2 * Math.PI) / someComponentData.componentSpacer[0]) *
                slotIndex -
              Math.PI / 2;
            const pointCosine = Math.cos(pointAngle);
            const pointSine = Math.sin(pointAngle);
            const radiusMax = (2 * Math.PI) / currentFullSlotWeights.length / 2;
            const radiusMin = radiusMax / 8;
            const radiusRange = radiusMax - radiusMin;
            const radiusStep = radiusRange / currentFullSlotWeights[0]!;
            return someSlotWeight === 0 ? null : (
              <circle
                cx={
                  pointCosine / paddedParitionRoot +
                  columnIndex * cellSize +
                  cellSizeHalf -
                  1.125
                }
                cy={
                  pointSine / paddedParitionRoot +
                  rowIndex * cellSize +
                  cellSizeHalf -
                  1.125
                }
                r={
                  (someSlotWeight * radiusStep + radiusMin) / paddedParitionRoot
                }
                fill={"yellow"}
              />
            );
          }
        );
      })}
    </Fragment>
  );
}
