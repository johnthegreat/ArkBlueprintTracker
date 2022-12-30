// SPDX-License-Identifier: MIT
import Blueprint from "../models/Blueprint";
import { orderBy } from "lodash";
import BlueprintsListCard from "./BlueprintsListCard";

export default function BlueprintLibraryPanelRight(props: {
  blueprints: Blueprint[];
  onEditClicked: Function;
  onDeleteClicked: Function;
  onCalculatorClicked: Function;
}) {
  // Sort blueprints by stats descending (show the best blueprints first)
  const blueprints = orderBy(
    props.blueprints,
    ["itemName", "armor", "damage", "durability"],
    ["asc", "desc", "desc", "desc"]
  );

  return (
    <div className="mb-3">
      <BlueprintsListCard
        blueprints={blueprints}
        onEditClicked={props.onEditClicked}
        onDeleteClicked={props.onDeleteClicked}
        onCalculatorClicked={props.onCalculatorClicked}
      />
    </div>
  );
}
