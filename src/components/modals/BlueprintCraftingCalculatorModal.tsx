// SPDX-License-Identifier: MIT
import Blueprint from "../../models/Blueprint";
import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import BlueprintMaterialCost from "../../models/BlueprintMaterialCost";

export default function BlueprintCraftingCalculatorModal(props: {
	blueprint: Blueprint,
	onClose: Function
}) {
	const [showModal, setShowModal] = useState<boolean>(true);
	const [quantityToCraft, setQuantityToCraft] = useState<number>(1);
	const handleClose = function() {
		props.onClose();
		setShowModal(false);
	};

	return (
		<Modal show={showModal} onHide={() => handleClose()}>
			<Modal.Header closeButton>
				<Modal.Title>Blueprint Crafting Cost Calculator</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="mb-3">
					<strong>{props.blueprint.itemName}</strong>
				</div>

				{props.blueprint.materialCosts && props.blueprint.materialCosts!.length > 0 ? <>
					<div className="mb-3">
						{props.blueprint.materialCosts.map((material: BlueprintMaterialCost) => {
							return (
								<div key={material.name} className="mb-1">
									{material.name} <span className="badge bg-primary">{material.cost}</span>
								</div>
							);
						})}
					</div>

					<div className="mb-3">
						<label htmlFor="quantityToCraft" className="form-label"><strong>Quantity</strong></label>
						<input type="number" className="form-control" min={1} max={100} step={1} value={quantityToCraft} id="quantityToCraft" onChange={
							(e) => {
								let value = parseInt((e.target as HTMLInputElement).value);
								if (Number.isNaN(value)) {
									value = 0;
								}
								setQuantityToCraft(value);
							}
						} />
					</div>

					<div className="mb-3">
						{props.blueprint.materialCosts.map((material: BlueprintMaterialCost) => {
							return (
								<div key={material.name} className="mb-1">
									<div className="row">
										<div className="col-sm">
											<label htmlFor={"material["+material.name+"]"} className="form-label"><strong>{material.name}</strong></label>
										</div>
										<div className="col-sm">
											<input id={"material["+material.name+"]"} type="number" value={material.cost * quantityToCraft} className="w-100" readOnly={true} />
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</> : <></>}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => handleClose()}>
					<FontAwesomeIcon icon={faCheck} /> Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};