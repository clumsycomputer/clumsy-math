import { JSX, ComponentChildren } from "preact";
import cssModule from "./ClumsyButton.module.scss";

export interface ClumsyButtonProps
  extends Required<Pick<JSX.HTMLAttributes<HTMLDivElement>, "onClick">> {
  children: ComponentChildren;
}

export function ClumsyButton(props: ClumsyButtonProps) {
  const { onClick, children } = props;
  return (
    <div className={cssModule.clumsyButton} onClick={onClick}>
      {children}
    </div>
  );
}
