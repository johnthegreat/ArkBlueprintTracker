// SPDX-License-Identifier: MIT
export default function doesItemHaveArmor(itemName: string) {
  if (itemName.indexOf(" Saddle") >= 0) {
    return true;
  }

  return (
    [
      "Chitin Boots",
      "Chitin Chestpiece",
      "Chitin Gauntlets",
      "Chitin Helmet",
      "Chitin Leggings",
      "Cloth Boots",
      "Cloth Gloves",
      "Cloth Hat",
      "Cloth Pants",
      "Cloth Shirt",
      "Desert Cloth Boots",
      "Desert Cloth Gloves",
      "Desert Cloth Pants",
      "Desert Cloth Shirt",
      "Desert Goggles and Hat",
      "Flak Boots",
      "Flak Chestpiece",
      "Flak Gauntlets",
      "Flak Helmet",
      "Flak Leggings",
      "Fur Boots",
      "Fur Cap",
      "Fur Chestpiece",
      "Fur Gauntlets",
      "Fur Leggings",
      "Ghillie Boots",
      "Ghillie Chestpiece",
      "Ghillie Gauntlets",
      "Ghillie Leggings",
      "Ghillie Mask",
      "Hazard Suit Boots",
      "Hazard Suit Gloves",
      "Hazard Suit Hat",
      "Hazard Suit Pants",
      "Hazard Suit Shirt",
      "Heavy Miner's Helmet",
      "Hide Boots",
      "Hide Gloves",
      "Hide Hat",
      "Hide Pants",
      "Hide Shirt",
      "Hyaenodon Meatpack",
      "Riot Boots",
      "Riot Chestpiece",
      "Riot Gauntlets",
      "Riot Helmet",
      "Riot Leggings",
      "SCUBA Leggings",
    ].indexOf(itemName) >= 0
  );
}
