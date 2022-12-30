// SPDX-License-Identifier: MIT
import BlueprintMaterialCost from "./BlueprintMaterialCost";

export default interface Blueprint {
  uuid?: string;
  itemName: string;
  quality: string;
  armor?: number;
  damage?: number;
  durability?: number;
  materialCosts?: BlueprintMaterialCost[];
  comment?: string;
  createdAt?: string;
}
