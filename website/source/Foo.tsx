import {
  tribeSpacer,
  spacerSymmetricSlotWeights,
  spacerIntervals,
  spacerWeight,
} from "clumsy-math";

export function Foo() {
  let analysisText = "";
  for (let i = 0; i < 16; i++) {
    const currentSpacer = tribeSpacer(i);
    const currentSymmetricSlotWeights =
      spacerSymmetricSlotWeights(currentSpacer);
    analysisText += `${currentSpacer[0]}\n`;
    analysisText += `${currentSpacer[1].length}\n`;
    analysisText += `${currentSpacer[0] / currentSpacer[1].length}\n`;
    analysisText += `${spacerIntervals(currentSpacer).join(",")}\n`;
    analysisText += `${currentSymmetricSlotWeights.join(",")}\n`;
    analysisText += `${spacerWeight(
      currentSymmetricSlotWeights,
      currentSpacer
    )}\n`;
    analysisText += "\n";
  }
  return <pre>{analysisText}</pre>;
}
