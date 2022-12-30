// SPDX-License-Identifier: MIT
import { keyBy } from "lodash";
const arkItemStackSizes = require("../data/ark-item-stack-sizes.json");
const keyedStackSizes = keyBy(arkItemStackSizes, "Item");

export default function getStackSize(materialName: string) {
  if (materialName === "Chitin/Keratin") {
    materialName = "Chitin";
  } else if (materialName === "Pelt, Hair, or Wool") {
    materialName = "Pelt";
  }

  return keyedStackSizes[materialName]
    ? keyedStackSizes[materialName].StackSize
    : Number.NaN;
}
