// SPDX-License-Identifier: MIT
import Blueprint from "../models/Blueprint";
import {useState} from "react";
import {Button, Collapse} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalculator, faPencilAlt, faTimes} from "@fortawesome/free-solid-svg-icons";

import getStackSize from "../utils/getStackSize";

export default function BlueprintsListCardSingle(props: {
	blueprint: Blueprint,
	onEditClicked?: Function,
	onDeleteClicked?: Function,
	onCalculatorClicked?: Function
}) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const blueprint = props.blueprint;
	let totalStacks = 0;

	return (
		<div className="col-12 mb-3">
			<div className="card h-100">
				<div className="card-header lead">
					{blueprint.itemName} - {blueprint.quality}
				</div>
				<div className="card-body">
					{(blueprint.armor || blueprint.damage || blueprint.durability) && <div className="mb-3">
						{blueprint.armor && <div>Armor: <strong>{blueprint.armor?.toFixed(1)}</strong></div>}
						{blueprint.damage && <div>Damage: <strong>{blueprint.damage?.toFixed(1)}</strong></div>}
						{blueprint.durability && <div>Durability: <strong>{blueprint.durability}</strong></div>}
					</div>}

					{blueprint.comment ? <div className="mb-3">
						{blueprint.comment}
					</div> : <></>}

					<div className="mb-3">
						<Button size="sm" variant="secondary" onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "Collapse Details" : "Expand Details"}</Button>
					</div>
					<Collapse in={isExpanded}>
						<div>
							<div className="mb-3"><strong>Material Costs</strong></div>

							<div className="mb-3">
								<div>
									{blueprint.materialCosts && blueprint.materialCosts?.length > 0 ? blueprint.materialCosts!.map(function(materialCost) {
										const numMaterialStacks = Math.ceil(materialCost.cost / getStackSize(materialCost.name));
										totalStacks += numMaterialStacks;
										return <div key={materialCost.name} className="mb-1">
											{materialCost.name}
											&nbsp;
											<span className="badge bg-primary">{materialCost.cost}</span> <span className="badge bg-secondary">{numMaterialStacks} Stack{numMaterialStacks>1?'s':''}</span></div>;
									}) : <></>}
								</div>

								{totalStacks > 0 ? <div className="badge bg-info mt-3">{totalStacks} Total Stacks</div> : <></>}
							</div>
						</div>
					</Collapse>

					<Button variant="primary" className="me-1" style={{whiteSpace: "nowrap"}} onClick={() => {
						if (props.onEditClicked) {
							props.onEditClicked(blueprint.uuid)
						}
					}}>
						<FontAwesomeIcon icon={faPencilAlt} className="me-1" /> Edit
					</Button>
					&nbsp;
					<Button variant="info" className="me-1" style={{whiteSpace: "nowrap"}} onClick={() => {
						if (props.onCalculatorClicked) {
							props.onCalculatorClicked(blueprint.uuid);
						}
					}}>
						<FontAwesomeIcon icon={faCalculator} className="me-1" /> Calculator
					</Button>
					&nbsp;
					<Button variant="danger" className="me-1" style={{whiteSpace: "nowrap"}} onClick={() => {
						if (props.onDeleteClicked) {
							props.onDeleteClicked(blueprint.uuid);
						}
					}}>
						<FontAwesomeIcon icon={faTimes} className="me-1" /> Delete
					</Button>
				</div>
			</div>
		</div>
	);
}