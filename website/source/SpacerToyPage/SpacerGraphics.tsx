import {
  componentSpacers,
  spacer,
  spacerFullSlotWeights,
  spacerGroup,
  spacerLineage,
  spacerSlotWeights,
} from "clumsy-math";
import { Fragment } from "preact/jsx-runtime";
import { ClumsyGraphic, ClumsyGraphicItem } from "../components/ClumsyGraphic";
import { SpacerToyState } from "./SpacerToyPage";
import cssModule from "./SpacerGraphics.module.scss";

export interface SpacerGraphicsProps {
  spacerToyState: SpacerToyState;
}

export function SpacerGraphics(props: SpacerGraphicsProps) {
  const { spacerToyState } = props;
  return (
    <div className={cssModule.graphicContainers}>
      <ClumsyGraphicItem itemLabel={"composition"}>
        <SpacerCompositionGraphic spacerToyState={spacerToyState} />
      </ClumsyGraphicItem>
      <ClumsyGraphicItem itemLabel={"terminal weights"}>
        <SpacerTerminalWeightsGraphic spacerToyState={spacerToyState} />
      </ClumsyGraphicItem>
      <ClumsyGraphicItem itemLabel={"symmetric weights"}>
        <SpacerSymmetricWeightsGraphic spacerToyState={spacerToyState} />
      </ClumsyGraphicItem>
    </div>
  );
}

interface SpacerCompositionGraphicProps
  extends Pick<SpacerGraphicsProps, "spacerToyState"> {}

function SpacerCompositionGraphic(props: SpacerCompositionGraphicProps) {
  const { spacerToyState } = props;
  return (
    <ClumsyGraphic
      geometryProps={{ spacerToyState }}
      Geometry={CompositionGeometry}
    />
  );
}

interface CompositionGeometryProps
  extends Pick<SpacerCompositionGraphicProps, "spacerToyState"> {}

function CompositionGeometry(props: CompositionGeometryProps) {
  const { spacerToyState } = props;
  const cellSize = 2.25 / spacerToyState.spacerStructure[0];
  const cellSizeHalf = cellSize / 2;
  const cellRadius = cellSizeHalf;
  return (
    <Fragment>
      {componentSpacers(spacerToyState.spacerStructure).map(
        (someComponent, componentIndex) => {
          const currentSpacer = spacer(someComponent);
          return currentSpacer[1].map((someSpacerPoint) => {
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
        }
      )}
    </Fragment>
  );
}

interface SpacerTerminalWeightsGraphicProps
  extends Pick<SpacerCompositionGraphicProps, "spacerToyState"> {}

function SpacerTerminalWeightsGraphic(
  props: SpacerTerminalWeightsGraphicProps
) {
  const { spacerToyState } = props;
  return (
    <ClumsyGraphic
      geometryProps={{ spacerToyState }}
      Geometry={GroupWeightsGeometry}
    />
  );
}

interface TerminalWeightsGeometryProps
  extends Pick<SpacerTerminalWeightsGraphicProps, "spacerToyState"> {}

function GroupWeightsGeometry(props: TerminalWeightsGeometryProps) {
  const { spacerToyState } = props;
  const cellSize = 2.25 / spacerToyState.spacerStructure[0];
  const cellSizeHalf = cellSize / 2;
  return (
    <Fragment>
      {componentSpacers(spacerToyState.spacerStructure).map(
        (someComponent, componentIndex) => {
          const currentLineage = spacerLineage(someComponent);
          const currentGroup = spacerGroup(
            currentLineage[currentLineage.length - 1]!
          );
          const currentSlotWeights = spacerSlotWeights(
            currentGroup.map((someSpacerStructure) =>
              spacer(someSpacerStructure)
            )
          );
          return currentSlotWeights.map((someSlotWeight, slotIndex) => {
            const columnIndex = slotIndex;
            const rowIndex = componentIndex;
            const radiusMax = cellSizeHalf;
            const radiusMin = radiusMax / 4;
            const radiusRange = radiusMax - radiusMin;
            const radiusStep = radiusRange / currentSlotWeights[0]!;
            return someSlotWeight > 0 ? (
              <circle
                r={someSlotWeight * radiusStep + radiusMin}
                cx={columnIndex * cellSize + cellSizeHalf - 1.125}
                cy={rowIndex * cellSize + cellSizeHalf - 1.125}
                fill={"yellow"}
              />
            ) : null;
          });
        }
      )}
    </Fragment>
  );
}

interface SpacerSymmetricWeightsGraphicProps
  extends Pick<SpacerCompositionGraphicProps, "spacerToyState"> {}

function SpacerSymmetricWeightsGraphic(
  props: SpacerSymmetricWeightsGraphicProps
) {
  const { spacerToyState } = props;
  return (
    <ClumsyGraphic
      geometryProps={{ spacerToyState }}
      Geometry={SymmetricWeightsGeometry}
    />
  );
}

interface SymmetricWeightsGeometryProps
  extends Pick<SpacerSymmetricWeightsGraphicProps, "spacerToyState"> {}

function SymmetricWeightsGeometry(props: SymmetricWeightsGeometryProps) {
  const { spacerToyState } = props;
  return (
    <Fragment>
      {spacerFullSlotWeights(spacer(spacerToyState.spacerStructure)).map(
        (someSlotWeight, slotIndex, currentFullSlotWeights) => {
          const pointAngle =
            ((2 * Math.PI) / spacerToyState.spacerStructure[0]) * slotIndex -
            Math.PI / 2;
          const pointCosine = Math.cos(pointAngle);
          const pointSine = Math.sin(pointAngle);
          const radiusMax = (2 * Math.PI) / currentFullSlotWeights.length / 2;
          const radiusMin = radiusMax / 8;
          const radiusRange = radiusMax - radiusMin;
          const radiusStep = radiusRange / currentFullSlotWeights[0]!;
          return someSlotWeight === 0 ? null : (
            <circle
              cx={pointCosine}
              cy={pointSine}
              r={someSlotWeight * radiusStep + radiusMin}
              fill={"yellow"}
            />
          );
        }
      )}
    </Fragment>
  );
}
