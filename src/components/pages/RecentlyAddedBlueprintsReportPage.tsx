// SPDX-License-Identifier: MIT
import { useContext } from "react";
import { BlueprintsContext } from "../../contexts/BlueprintsContext";
import RecentlyAddedBlueprintsWidget from "../RecentlyAddedBlueprintsWidget";

export default function RecentlyAddedBlueprintsReportPage() {
  const blueprints = useContext(BlueprintsContext);
  const quantityToShow = 20;

  return (
    <>
      <h2 className={"mb-3"}>Recently Added Blueprints Report</h2>

      <div
        className={"mb-3"}
        style={{
          maxHeight: "80vh",
          overflow: "auto",
          boxSizing: "border-box",
        }}
      >
        <RecentlyAddedBlueprintsWidget
          blueprints={blueprints}
          quantityToShow={quantityToShow}
          defaultOpen={true}
        />
      </div>

      <div className={"text-muted"}>Limited to {quantityToShow} results.</div>
    </>
  );
}
