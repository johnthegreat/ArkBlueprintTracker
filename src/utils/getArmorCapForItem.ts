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
    return 248;
  } else if (itemName.startsWith("Flak ")) {
    return 496;
  } else if (itemName.startsWith("Riot ")) {
    return 570.4;
  }

  /* Based on currently available information, armor cap is 74.5:
   * https://ark.wiki.gg/wiki/Server_configuration#ItemStatClamps
   * "This would clamp Saddles to 124.0 armor (74.5 for the 'tank' creatures such as Doedicurus, Rock Elemental, etc.)"
   */
  if (itemName === "Doedicurus Saddle" || itemName === "Rock Golem Saddle") {
    return 74.5;
  }

  // TODO This technically is not correct for some creatures, like a Magmasaur.
  if (itemName.indexOf(" Saddle") || itemName === "Hyaenodon Meatpack") {
    return 124;
  }

  return undefined;
}
