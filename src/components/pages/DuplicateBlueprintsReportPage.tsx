// SPDX-License-Identifier: MIT
import { useContext } from "react";
import { BlueprintsContext } from "../../contexts/BlueprintsContext";
import DuplicateBlueprintsWidget from "../DuplicateBlueprintsWidget";

export default function DuplicateBlueprintReportPage() {
  const blueprints = useContext(BlueprintsContext);

  return (
    <>
      <h2 className={"mb-3"}>Duplicate Blueprints Report</h2>

      <DuplicateBlueprintsWidget blueprints={blueprints} defaultOpen={true} />
    </>
  );
}
