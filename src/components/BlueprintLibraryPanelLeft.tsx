// SPDX-License-Identifier: MIT
import Blueprint from "../models/Blueprint";
import { countBy, keys, sortBy } from "lodash";

export default function BlueprintLibraryPanelLeft(props: {
  blueprints: Blueprint[];
  onItemNameClicked: Function;
  activeItemName?: string;
}) {
  const blueprintDataToShow = countBy(props.blueprints, "itemName");
  const blueprintKeys = sortBy(keys(blueprintDataToShow), (value) =>
    value.toLowerCase()
  );

  return (
    <div className="mb-3">
      <ul className="list-group">
        <li
          key={"AllBlueprints"}
          className="list-group-item"
          style={{ cursor: "pointer" }}
          onClick={() => {
            //setItemNameClicked(undefined);
            props.onItemNameClicked(undefined);
          }}
        >
          {props.activeItemName === undefined ? (
            <strong>All Blueprints</strong>
          ) : (
            "All Blueprints"
          )}{" "}
          <span className="badge bg-secondary float-end">
            {props.blueprints.length}
          </span>
        </li>
        {blueprintKeys.map(function (itemName) {
          return (
            <li
              key={itemName}
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => {
                //setItemNameClicked(itemName);
                props.onItemNameClicked(itemName);
              }}
            >
              {props.activeItemName === itemName ? (
                <strong>{itemName}</strong>
              ) : (
                itemName
              )}{" "}
              <span className="badge bg-secondary float-end">
                {blueprintDataToShow[itemName]}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
