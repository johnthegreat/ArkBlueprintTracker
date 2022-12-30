// SPDX-License-Identifier: MIT
import Blueprint from "../models/Blueprint";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

import getStackSize from "../utils/getStackSize";

export default function BlueprintsListTable(props: {
  blueprints: Blueprint[];
  onEditClicked?: Function;
  onDeleteClicked?: Function;
}) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quality</th>
            <th>Armor</th>
            <th>Damage</th>
            <th>Materials</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.blueprints.map(function (blueprint: Blueprint) {
            let totalStacks = 0;

            return (
              <tr key={blueprint.uuid}>
                <td>{blueprint.itemName}</td>
                <td>{blueprint.quality}</td>
                <td>{blueprint.armor?.toFixed(1)}</td>
                <td>{blueprint.damage?.toFixed(1)}</td>
                <td>
                  {blueprint.materialCosts &&
                  blueprint.materialCosts?.length > 0 ? (
                    blueprint.materialCosts!.map(function (materialCost) {
                      const numMaterialStacks = Math.ceil(
                        materialCost.cost / getStackSize(materialCost.name)
                      );
                      totalStacks += numMaterialStacks;
                      return (
                        <div key={materialCost.name}>
                          {materialCost.name}
                          &nbsp;
                          <span className="badge bg-primary">
                            {materialCost.cost}
                          </span>{" "}
                          <span className="badge bg-secondary">
                            {numMaterialStacks} Stack
                            {numMaterialStacks > 1 ? "s" : ""}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}

                  {totalStacks > 0 ? (
                    <div className="badge bg-info mt-3">
                      {totalStacks} Total Stacks
                    </div>
                  ) : (
                    <></>
                  )}
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => {
                      if (props.onEditClicked) {
                        props.onEditClicked(blueprint.uuid);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} /> Edit
                  </Button>
                  &nbsp;
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => {
                      if (props.onDeleteClicked) {
                        props.onDeleteClicked(blueprint.uuid);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} /> Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
