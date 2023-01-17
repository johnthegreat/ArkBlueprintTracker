// SPDX-License-Identifier: MIT
export default function doesItemHaveDamage(itemName: string) {
  return (
    [
      "Assault Rifle",
      "Bow",
      "Chainsaw",
      "Compound Bow",
      "Crossbow",
      "Electric Prod",
      "Fabricated Pistol",
      "Fabricated Sniper Rifle",
      "Flamethrower",
      "Lance",
      "Longneck Rifle",
      "Metal Hatchet",
      "Metal Pick",
      "Metal Sickle",
      "Pike",
      "Pump-Action Shotgun",
      "Shotgun",
      "Simple Pistol",
      "Slingshot",
      "Spear",
      "Stone Hatchet",
      "Stone Pick",
      "Sword",
      "Torch",
      "Tropeognathus Saddle",
      "Whip",
      "Wooden Club",
    ].indexOf(itemName) >= 0
  );
}
