// SPDX-License-Identifier: MIT
import { useState } from "react";
import Blueprint from "../models/Blueprint";
import { filter, reverse, slice, sortBy } from "lodash";
import { Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function RecentlyAddedBlueprintsWidget(props: {
  blueprints: Blueprint[];
  quantityToShow: number;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const blueprintsToShow = slice(
    reverse(
      filter(sortBy(props.blueprints, "createdAt"), function (e) {
        return e.createdAt !== undefined;
      })
    ),
    0,
    props.quantityToShow
  );

  return (
    <div className="card h-100">
      <div
        className="card-header"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
        aria-label="Expand or collapse list of recently added blueprints"
      >
        <FontAwesomeIcon
          className="me-2"
          icon={isOpen ? faChevronDown : faChevronRight}
        />{" "}
        Recently Added Blueprints
      </div>
      <Collapse in={isOpen}>
        <div
          className="card-body"
          style={{ maxHeight: "10rem", overflowY: "scroll" }}
        >
          {blueprintsToShow.map(function (blueprint) {
            return (
              <p key={blueprint.uuid}>
                {blueprint.itemName} - {blueprint.quality}
              </p>
            );
          })}
        </div>
      </Collapse>
    </div>
  );
}
