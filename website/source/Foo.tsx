import {
  tribeSpacer,
  spacerFullSlotWeights,
  spacerIntervals,
  spacerWeight,
} from "clumsy-math";

export function Foo() {
  let analysisText = "";
  for (let i = 0; i < 16; i++) {
    const currentSpacer = tribeSpacer(i);
    const currentFullSlotWeights = spacerFullSlotWeights(currentSpacer);
    analysisText += `${currentSpacer[0]}\n`;
    analysisText += `${currentSpacer[1].length}\n`;
    analysisText += `${currentSpacer[0] / currentSpacer[1].length}\n`;
    analysisText += `${spacerIntervals(currentSpacer).join(",")}\n`;
    analysisText += `${currentFullSlotWeights.join(",")}\n`;
    analysisText += `${spacerWeight(currentFullSlotWeights, currentSpacer)}\n`;
    analysisText += "\n";
  }
  return <pre>{analysisText}</pre>;
}
