// SPDX-License-Identifier: MIT
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import OffcanvasMenu from "./OffcanvasMenu";

export default function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      <header className="container-fluid px-5 mb-3 d-flex align-items-center justify-content-between">
        <h1>Ark Blueprint Database</h1>

        <button
          type={"button"}
          className={"btn btn-link p-0 m-0 text-secondary"}
          onClick={() => setShowMenu(true)}
        >
          <FontAwesomeIcon icon={faBars} size={"2x"} />
        </button>

        {showMenu ? <OffcanvasMenu onClose={() => setShowMenu(false)} /> : null}
      </header>
    </>
  );
}
