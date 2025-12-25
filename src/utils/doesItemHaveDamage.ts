// SPDX-License-Identifier: MIT
export default function doesItemHaveDamage(itemName: string) {
  return (
    [
      "Andrewsarchus Saddle",
      "Assault Rifle",
      "Bow",
      "Chainsaw",
      "Climbing Pick",
      "Compound Bow",
      "Crossbow",
      "Electric Prod",
      "Fabricated Pistol",
      "Fabricated Sniper Rifle",
      "Flamethrower",
      "Harpoon Launcher",
      "Lance",
      "Longneck Rifle",
      "Metal Hatchet",
      "Metal Pick",
      "Metal Sickle",
      "Minigun",
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
