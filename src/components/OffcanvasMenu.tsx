// SPDX-License-Identifier: MIT
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OffcanvasMenu(props: { onClose: () => void }) {
  return (
    <>
      <Offcanvas show={true} onHide={() => props.onClose()} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link
            to={"/"}
            className={"d-block mb-3"}
            onClick={() => props.onClose()}
          >
            Dashboard
          </Link>

          <Link
            to={"/reports/duplicates"}
            onClick={() => props.onClose()}
            className={"d-block mb-3"}
          >
            Duplicate Blueprints Report
          </Link>
          <Link
            to={"/reports/most-recent"}
            onClick={() => props.onClose()}
            className={"d-block mb-3"}
          >
            Recently Added Blueprints Report
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
