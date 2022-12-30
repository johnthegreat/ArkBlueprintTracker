import doesItemHaveArmor from "./doesItemHaveArmor";

/**
 * @param {string} itemName
 * @return {number|undefined}
 */
export default function getArmorCapForItem(itemName: string) {
  if (!doesItemHaveArmor(itemName)) {
    return undefined;
  }

  // https://ark.wiki.gg/wiki/Blueprints#Maximum_Armor_and_Damage
  if (itemName.startsWith("Cloth ")) {
    return 188;
  } else if (itemName.startsWith("Hide ")) {
    return 188;
  } else if (itemName.startsWith("Ghillie ")) {
    return 158.7;
  } else if (itemName.startsWith("Fur ")) {
    return 188;
  } else if (itemName.startsWith("Chitin ")) {
    return 235;
  } else if (itemName.startsWith("Flak ")) {
    return 496;
  } else if (itemName.startsWith("Riot ")) {
    return 570.4;
  }

  // TODO This technically is not correct for some creatures, like a Magmasaur.
  if (itemName.indexOf(" Saddle") || itemName === "Hyaenodon Meatpack") {
    return 124;
  }

  return undefined;
}
