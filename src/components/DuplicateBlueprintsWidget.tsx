// SPDX-License-Identifier: MIT
import { useState } from "react";
import Blueprint from "../models/Blueprint";
import { countBy, filter, keys, sortBy } from "lodash";
import { Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function DuplicateBlueprintsWidget(props: {
  blueprints: Blueprint[];
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(props.defaultOpen ?? false);

  const counts = countBy(props.blueprints, "itemName");
  const allDuplicateItemNames = sortBy(
    filter(keys(counts), function (blueprintItemName) {
      return counts[blueprintItemName] > 1;
    })
  );

  return (
    <div className="card h-100">
      <div
        className="card-header"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
        aria-label="Expand or collapse list of duplicate blueprints"
      >
        <FontAwesomeIcon
          className="me-2"
          icon={isOpen ? faChevronDown : faChevronRight}
        />{" "}
        Duplicate Blueprints{" "}
        <span className="float-end badge bg-secondary">
          {allDuplicateItemNames.length}
        </span>
      </div>

      <Collapse in={isOpen}>
        <div
          className="card-body"
          style={{ maxHeight: "10rem", overflowY: "scroll" }}
        >
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Blueprint</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {allDuplicateItemNames.map(function (itemName) {
                  return (
                    <tr key={itemName}>
                      <td>{itemName}</td>
                      <td>{counts[itemName]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
