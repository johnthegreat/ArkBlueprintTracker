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
import { DateTime } from "luxon";

export default function RecentlyAddedBlueprintsWidget(props: {
  blueprints: Blueprint[];
  quantityToShow: number;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(props.defaultOpen ?? false);

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
        <div className="card-body" style={{ overflowY: "scroll" }}>
          <ul className={"list-group"}>
            {blueprintsToShow.map(function (blueprint) {
              return (
                <li className={"list-group-item"} key={blueprint.uuid}>
                  <div className={"mb-3"}>
                    {blueprint.itemName} - {blueprint.quality}
                  </div>
                  <div className={"fw-light fst-italic fs-6 mb-3"}>
                    {blueprint.server}
                  </div>
                  {blueprint.createdAt ? (
                    <div className={"fw-light fs-6"}>
                      {DateTime.fromISO(blueprint.createdAt).toLocaleString(
                        DateTime.DATETIME_FULL_WITH_SECONDS
                      )}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </Collapse>
    </div>
  );
}
