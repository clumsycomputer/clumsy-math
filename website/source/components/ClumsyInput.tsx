import { useEffect, useState } from "preact/hooks";
import cssModule from "./ClumsyInput.module.scss";
import { ComponentChildren, JSX } from "preact";

export interface ModulusNumberInputProps
  extends Pick<
    NumberInputBaseProps,
    "value" | "valueStep" | "minValue" | "maxValue" | "onInput"
  > {}

export function ModulusNumberInput(props: ModulusNumberInputProps) {
  const { valueStep, minValue, maxValue, value, onInput } = props;
  return (
    <NumberInputBase
      valueStep={valueStep}
      minValue={minValue}
      maxValue={maxValue}
      value={value}
      onInput={onInput}
      getAdjustedStepValue={(nextStepValue, minValue, maxValue) =>
        (((nextStepValue + maxValue) % maxValue) + maxValue) % maxValue
      }
    />
  );
}

export interface ClampedNumberInputProps
  extends Pick<
    NumberInputBaseProps,
    "value" | "valueStep" | "minValue" | "maxValue" | "onInput"
  > {}

export function ClampedNumberInput(props: ClampedNumberInputProps) {
  const { valueStep, minValue, maxValue, value, onInput } = props;
  return (
    <NumberInputBase
      valueStep={valueStep}
      minValue={minValue}
      maxValue={maxValue}
      value={value}
      onInput={onInput}
      getAdjustedStepValue={(nextStepValue, minValue, maxValue) =>
        nextStepValue < minValue
          ? minValue
          : nextStepValue > maxValue
          ? maxValue
          : nextStepValue
      }
    />
  );
}

interface NumberInputBaseProps {
  valueStep: number;
  minValue: number;
  maxValue: number;
  value: number;
  onInput: (nextValue: number) => void;
  getAdjustedStepValue: (
    nextStepValue: number,
    minValue: number,
    maxValue: number
  ) => number;
}

function NumberInputBase(props: NumberInputBaseProps) {
  const {
    value,
    onInput,
    valueStep,
    minValue,
    maxValue,
    getAdjustedStepValue,
  } = props;
  const [displayState, setDisplayState] = useState({
    valueStatus: "valid",
    numericValue: value,
    textValue: `${value}`,
  });
  useEffect(() => {
    if (displayState.numericValue !== value) {
      setDisplayState({
        valueStatus: "valid",
        numericValue: value,
        textValue: `${value}`,
      });
    }
  }, [value]);
  useEffect(() => {
    if (
      displayState.valueStatus === "valid" &&
      displayState.numericValue !== value
    ) {
      onInput(displayState.numericValue);
    }
  }, [displayState]);
  return (
    <div className={cssModule.numberInputContainer}>
      <input
        className={
          displayState.valueStatus === "valid"
            ? cssModule.numberInput
            : `${cssModule.numberInput} ${cssModule.invalidNumberInput}`
        }
        type={"text"}
        autocomplete={"off"}
        autocorrect={"off"}
        autocapitalize={"off"}
        spellcheck={false}
        value={displayState.textValue}
        onInput={(someInputEvent) => {
          const nextTextValue = someInputEvent.currentTarget.value;
          const nextNumericValue = parseFloat(nextTextValue);
          setDisplayState({
            valueStatus:
              nextNumericValue >= minValue && nextNumericValue <= maxValue
                ? "valid"
                : "invalid",
            textValue: nextTextValue,
            numericValue: nextNumericValue,
          });
        }}
      />
      <InputButton
        onClick={() => {
          const nextStepValue = displayState.numericValue - valueStep;
          const nextNumericValue = getAdjustedStepValue(
            nextStepValue,
            minValue,
            maxValue
          );
          setDisplayState({
            valueStatus:
              nextNumericValue >= minValue && nextNumericValue <= maxValue
                ? "valid"
                : "invalid",
            numericValue: nextNumericValue,
            textValue: `${nextNumericValue}`,
          });
        }}
      >
        <svg width={18} height={24} viewBox={"6 3 12 18"}>
          <path
            d={
              "M12.29 8.71L9.7 11.3c-.39.39-.39 1.02 0 1.41l2.59 2.59c.63.63 1.71.18 1.71-.71V9.41c0-.89-1.08-1.33-1.71-.7z"
            }
          />
        </svg>
      </InputButton>
      <InputButton
        onClick={() => {
          const nextStepValue = displayState.numericValue + valueStep;
          const nextNumericValue = getAdjustedStepValue(
            nextStepValue,
            minValue,
            maxValue
          );
          setDisplayState({
            valueStatus:
              nextNumericValue >= minValue && nextNumericValue <= maxValue
                ? "valid"
                : "invalid",
            numericValue: nextNumericValue,
            textValue: `${nextNumericValue}`,
          });
        }}
      >
        <svg width={18} height={24} viewBox={"6 3 12 18"}>
          <path
            d={
              "M11.71 15.29l2.59-2.59c.39-.39.39-1.02 0-1.41L11.71 8.7c-.63-.62-1.71-.18-1.71.71v5.17c0 .9 1.08 1.34 1.71.71z"
            }
          />
        </svg>
      </InputButton>
    </div>
  );
}

interface InputButtonProps
  extends Pick<JSX.HTMLAttributes<HTMLDivElement>, "onClick"> {
  children: ComponentChildren;
}

function InputButton(props: InputButtonProps) {
  const { onClick, children } = props;
  return (
    <div className={cssModule.inputButton} onClick={onClick}>
      {children}
    </div>
  );
}
