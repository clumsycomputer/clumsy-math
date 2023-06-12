import { useEffect, useState } from "preact/hooks";
import cssModule from "./ClumsyInput.module.scss";
import { ComponentChildren, JSX } from "preact";

export interface ModulusNumberInputProps
  extends Pick<NumberInputBaseProps, "value" | "valueStep"> {
  minValue: number;
  maxValue: number;
  onInput: (nextValue: number) => void;
}

export function ModulusNumberInput(props: ModulusNumberInputProps) {
  const { value, valueStep, minValue, maxValue, onInput } = props;
  const [displayState, setDisplayState] = useState({
    valueStatus: "valid",
    value,
  });
  useEffect(() => {
    if (displayState.value !== value) {
      setDisplayState({
        valueStatus: "valid",
        value,
      });
    }
  }, [value]);
  useEffect(() => {
    if (displayState.valueStatus === "valid" && displayState.value !== value) {
      onInput(displayState.value);
    }
  }, [displayState]);
  return (
    <NumberInputBase
      className={
        displayState.valueStatus === "invalid"
          ? cssModule.invalidInputContainer
          : undefined
      }
      value={displayState.value}
      valueStep={valueStep}
      onKeyboardInput={(nextDisplayValue) => {
        setDisplayState({
          value: nextDisplayValue,
          valueStatus:
            nextDisplayValue >= minValue && nextDisplayValue <= maxValue
              ? "valid"
              : "invalid",
        });
      }}
      onStepInput={(nextDisplayValue) => {
        const maxValuePlusOne = maxValue + 1;
        const adjustedDisplayValue =
          ((nextDisplayValue % maxValuePlusOne) + maxValuePlusOne) %
          maxValuePlusOne;
        setDisplayState({
          valueStatus: "valid",
          value: adjustedDisplayValue,
        });
      }}
    />
  );
}

export interface ClampedNumberInputProps
  extends Pick<NumberInputBaseProps, "value" | "valueStep"> {
  minValue: number;
  maxValue: number;
  onInput: (nextValue: number) => void;
}

export function ClampedNumberInput(props: ClampedNumberInputProps) {
  const { value, valueStep, minValue, maxValue, onInput } = props;
  const [displayState, setDisplayState] = useState({
    valueStatus: "valid",
    value,
  });
  useEffect(() => {
    if (displayState.value !== value) {
      setDisplayState({
        valueStatus: "valid",
        value,
      });
    }
  }, [value]);
  useEffect(() => {
    if (displayState.valueStatus === "valid" && displayState.value !== value) {
      onInput(displayState.value);
    }
  }, [displayState]);
  return (
    <NumberInputBase
      className={
        displayState.valueStatus === "invalid"
          ? cssModule.invalidInputContainer
          : undefined
      }
      value={displayState.value}
      valueStep={valueStep}
      onKeyboardInput={(nextDisplayValue) => {
        setDisplayState({
          value: nextDisplayValue,
          valueStatus:
            nextDisplayValue >= minValue && nextDisplayValue <= maxValue
              ? "valid"
              : "invalid",
        });
      }}
      onStepInput={(nextDisplayValue) => {
        const clampedDisplayValue =
          nextDisplayValue < minValue
            ? minValue
            : nextDisplayValue > maxValue
            ? maxValue
            : nextDisplayValue;
        setDisplayState({
          valueStatus: "valid",
          value: clampedDisplayValue,
        });
      }}
    />
  );
}

interface NumberInputBaseProps {
  className?: string;
  value: number;
  valueStep: number;
  onKeyboardInput: (nextValue: number) => void;
  onStepInput: (nextValue: number) => void;
}

function NumberInputBase(props: NumberInputBaseProps) {
  const {
    className = "",
    value,
    onKeyboardInput,
    valueStep,
    onStepInput,
  } = props;
  return (
    <div className={`${cssModule.numberInputContainer} ${className}`}>
      <input
        className={cssModule.numberInput}
        type={"text"}
        autocomplete={"off"}
        autocorrect={"off"}
        autocapitalize={"off"}
        spellcheck={false}
        value={value}
        onInput={(someInputEvent) => {
          const nextValue = parseFloat(someInputEvent.currentTarget.value);
          onKeyboardInput(nextValue);
        }}
      />
      <InputButton
        onClick={() => {
          const nextValue = value - valueStep;
          onStepInput(nextValue);
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
          const nextValue = value + valueStep;
          onStepInput(nextValue);
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
