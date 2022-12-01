// SPDX-License-Identifier: MIT
import Blueprint from "../models/Blueprint";
import BlueprintsListCardSingle from "./BlueprintsListCardSingle";

export default function BlueprintsListCard(props: {
	blueprints: Blueprint[],
	onEditClicked?: Function,
	onDeleteClicked?: Function,
	onCalculatorClicked?: Function
}) {
	return (
		<div className="row">
			{props.blueprints.map(function(blueprint: Blueprint) {
				return <BlueprintsListCardSingle blueprint={blueprint} key={blueprint.uuid} onCalculatorClicked={props.onCalculatorClicked} onDeleteClicked={props.onDeleteClicked} onEditClicked={props.onEditClicked} />
			})}
		</div>
	);
}