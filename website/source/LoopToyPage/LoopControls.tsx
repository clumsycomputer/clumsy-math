import { LOOP_ONE, LOOP_ZERO, LoopStructure } from "clumsy-math";
import { JSX, ComponentChildren, ComponentChild } from "preact";
import { StateUpdater } from "preact/hooks";
import { LoopToyState } from "./LoopToyPage";
import cssModule from "./LoopControls.module.scss";

export interface LoopControlsProps {
  loopToyState: LoopToyState;
  setLoopToyState: StateUpdater<LoopToyState>;
}

export function LoopControls(props: LoopControlsProps) {
  const { setLoopToyState, loopToyState } = props;
  return (
    <div className={cssModule.loopControls}>
      {loopToyState.loopStructure.map((_, layerIndex) =>
        layerIndex === 0 ||
        layerIndex < loopToyState.loopStructure.length - 1 ? (
          <BaseLoopLayerControls
            setLoopToyState={setLoopToyState}
            loopToyState={loopToyState}
            layerIndex={layerIndex}
          />
        ) : (
          <TerminalLoopLayerControls
            setLoopToyState={setLoopToyState}
            loopToyState={loopToyState}
            layerIndex={layerIndex}
          />
        )
      )}
      <div className={cssModule.addLayerContainer}>
        <LoopButton
          onClick={() => {
            const nextLoopStructure: LoopStructure =
              loopToyState.loopStructure.map((someLoopLayer) => [
                ...someLoopLayer,
              ]);
            nextLoopStructure.push([0.5, 0.5, 0, 0, 0]);
            setLoopToyState({
              ...loopToyState,
              loopStructure: nextLoopStructure,
            });
          }}
        >
          add layer
        </LoopButton>
      </div>
    </div>
  );
}

interface BaseLoopLayerControlsProps
  extends Pick<
    LoopLayerControlsBaseProps,
    "setLoopToyState" | "loopToyState" | "layerIndex"
  > {}

function BaseLoopLayerControls(props: BaseLoopLayerControlsProps) {
  const { setLoopToyState, loopToyState, layerIndex } = props;
  return (
    <LoopLayerControlsBase
      setLoopToyState={setLoopToyState}
      loopToyState={loopToyState}
      layerIndex={layerIndex}
      removeButton={null}
    />
  );
}

interface TerminalLoopLayerControlsProps
  extends Pick<
    LoopLayerControlsBaseProps,
    "setLoopToyState" | "loopToyState" | "layerIndex"
  > {}

function TerminalLoopLayerControls(props: TerminalLoopLayerControlsProps) {
  const { setLoopToyState, loopToyState, layerIndex } = props;
  return (
    <LoopLayerControlsBase
      setLoopToyState={setLoopToyState}
      loopToyState={loopToyState}
      layerIndex={layerIndex}
      removeButton={
        <div className={cssModule.removeLayerContainer}>
          <LoopButton
            onClick={() => {
              const nextLoopStructure: LoopStructure =
                loopToyState.loopStructure.map((someLoopLayer) => [
                  ...someLoopLayer,
                ]);
              nextLoopStructure.pop();
              setLoopToyState({
                ...loopToyState,
                loopStructure: nextLoopStructure,
              });
            }}
          >
            remove
          </LoopButton>
        </div>
      }
    />
  );
}

interface LoopLayerControlsBaseProps
  extends Pick<LoopControlsProps, "setLoopToyState" | "loopToyState"> {
  layerIndex: number;
  removeButton: ComponentChild;
}

function LoopLayerControlsBase(props: LoopLayerControlsBaseProps) {
  const { setLoopToyState, loopToyState, layerIndex, removeButton } = props;
  return (
    <div className={cssModule.layerControls}>
      <RelativeLoopSliderInput
        setLoopToyState={setLoopToyState}
        loopToyState={loopToyState}
        layerIndex={layerIndex}
        componentIndex={0}
      />
      <RelativeLoopSliderInput
        setLoopToyState={setLoopToyState}
        loopToyState={loopToyState}
        layerIndex={layerIndex}
        componentIndex={1}
      />
      <RadianLoopSliderInput
        setLoopToyState={setLoopToyState}
        loopToyState={loopToyState}
        layerIndex={layerIndex}
        componentIndex={2}
      />
      <RadianLoopSliderInput
        setLoopToyState={setLoopToyState}
        loopToyState={loopToyState}
        layerIndex={layerIndex}
        componentIndex={3}
      />
      {removeButton}
    </div>
  );
}

interface RadianLoopSliderInputProps
  extends Pick<
    LoopSliderInputProps,
    "setLoopToyState" | "loopToyState" | "layerIndex" | "componentIndex"
  > {}

function RadianLoopSliderInput(props: RadianLoopSliderInputProps) {
  const { componentIndex, layerIndex, loopToyState, setLoopToyState } = props;
  return (
    <LoopSliderInput
      min={0}
      max={2 * Math.PI}
      step={(2 * Math.PI) / 128}
      componentIndex={componentIndex}
      layerIndex={layerIndex}
      loopToyState={loopToyState}
      setLoopToyState={setLoopToyState}
    />
  );
}

interface RelativeLoopSliderInputProps
  extends Pick<
    LoopSliderInputProps,
    "setLoopToyState" | "loopToyState" | "layerIndex" | "componentIndex"
  > {}

function RelativeLoopSliderInput(props: RelativeLoopSliderInputProps) {
  const { componentIndex, layerIndex, loopToyState, setLoopToyState } = props;
  return (
    <LoopSliderInput
      min={LOOP_ZERO}
      max={LOOP_ONE}
      step={(LOOP_ONE - LOOP_ZERO) / 128}
      componentIndex={componentIndex}
      layerIndex={layerIndex}
      loopToyState={loopToyState}
      setLoopToyState={setLoopToyState}
    />
  );
}

interface LoopSliderInputProps
  extends Pick<
      LoopLayerControlsBaseProps,
      "setLoopToyState" | "loopToyState" | "layerIndex"
    >,
    Required<
      Pick<JSX.HTMLAttributes<HTMLInputElement>, "min" | "max" | "step">
    > {
  componentIndex: number;
}

function LoopSliderInput(props: LoopSliderInputProps) {
  const {
    min,
    max,
    step,
    loopToyState,
    layerIndex,
    componentIndex,
    setLoopToyState,
  } = props;
  return (
    <div className={cssModule.sliderContainer}>
      <input
        type={"range"}
        min={min}
        max={max}
        step={step}
        value={loopToyState.loopStructure[layerIndex]![componentIndex]}
        onInput={(someInputEvent) => {
          const nextLoopStructure: LoopStructure =
            loopToyState.loopStructure.map((someLoopLayer) => [
              ...someLoopLayer,
            ]);
          nextLoopStructure[layerIndex]![componentIndex] = parseFloat(
            someInputEvent.currentTarget.value
          );
          setLoopToyState({
            ...loopToyState,
            loopStructure: nextLoopStructure,
          });
        }}
      />
    </div>
  );
}

interface LoopButtonProps
  extends Required<Pick<JSX.HTMLAttributes<HTMLDivElement>, "onClick">> {
  children: ComponentChildren;
}

function LoopButton(props: LoopButtonProps) {
  const { onClick, children } = props;
  return (
    <div className={cssModule.loopButton} onClick={onClick}>
      {children}
    </div>
  );
}
