// SPDX-License-Identifier: MIT
import {Button, Modal} from "react-bootstrap";
import {useState, useEffect} from "react";
import {map,  sortBy, filter, first, keys, cloneDeep} from "lodash";
import { Typeahead } from 'react-bootstrap-typeahead';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faCheck} from "@fortawesome/free-solid-svg-icons";
import Blueprint from "../../models/Blueprint";
import BlueprintMaterialCost from "../../models/BlueprintMaterialCost";
import doesItemHaveArmor from "../../utils/doesItemHaveArmor";
import doesItemHaveDamage from "../../utils/doesItemHaveDamage";

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.min.css';
import doesItemHaveDurability from "../../utils/doesItemHaveDurability";

let arkItemQualityTiers = require('../../data/ark-item-quality-tiers.json');
arkItemQualityTiers = sortBy(arkItemQualityTiers, 'QualityTier');
let arkItemMaterials = require('../../data/ark-item-materials.json');
arkItemMaterials = sortBy(arkItemMaterials, 'Item');

export default function AddBlueprintModal(props: {
	closeLabel?: string,
	confirmLabel?: string,
	onCallback: Function,
	existingBlueprint?: Blueprint
}) {
	const [showModal, setShowModal] = useState<boolean>(true);
	const [selectedItem, setSelectedItem] = useState<string>('');
	const [itemQuality, setItemQuality] = useState<string>('Primitive');
	const [materials, setMaterials] = useState<string[]>([]);
	const [materialsCount, setMaterialsCount] = useState<{[index:string] : number}>({});
	const [armorRating, setArmorRating] = useState<number|undefined>(undefined);
	const [damageRating, setDamageRating] = useState<number|undefined>(undefined);
	const [durabilityRating, setDurabilityRating] = useState<number|undefined>(undefined);
	const [comment, setComment] = useState<string|undefined>(undefined);

	useEffect(function() {
		if (props.existingBlueprint) {
			setSelectedItem(props.existingBlueprint.itemName);
			setItemQuality(props.existingBlueprint.quality);
			//setMaterials()
			//setMaterialsCount(props.existingBlueprint.materialCosts);
			setArmorRating(props.existingBlueprint.armor);
			setDamageRating(props.existingBlueprint.damage);
			setDurabilityRating(props.existingBlueprint.durability);
			setComment(props.existingBlueprint.comment);
		}
	}, [props.existingBlueprint]);

	function handleClose(save: boolean) {
		if (save) {
			const materialsKeys = sortBy(keys(materialsCount));
			const materialCosts: BlueprintMaterialCost[] = [];
			for(let i=0;i<materialsKeys.length;i++) {
				const materialsKey = materialsKeys[i];
				materialCosts.push({
					name: materialsKey,
					cost: materialsCount[materialsKey]
				});
			}

			const blueprint: Blueprint = {
				itemName: selectedItem,
				quality: itemQuality,
				armor: armorRating,
				damage: damageRating,
				durability: durabilityRating,
				materialCosts: materialCosts,
				comment: comment
			};
			props.onCallback(blueprint);
		} else {
			props.onCallback(undefined);
		}
		setShowModal(false);
	}

	function onItemSelected(itemName: string) {
		const foundItem = first(filter(arkItemMaterials, function(arkItemMaterial) {
			return arkItemMaterial.Item === itemName
		}));
		if (foundItem) {
			setSelectedItem(foundItem.Item);
			// Reset these values to make sure an armor item doesn't have damage, etc.
			setArmorRating(undefined);
			setDamageRating(undefined);
			setDurabilityRating(undefined);
			setMaterials(foundItem.Materials);
		}
	}

	return (
		<Modal show={showModal} onHide={() => handleClose(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Add Blueprint</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form id="createClusterModalForm needs-validation">
					<div className="mb-3">
						<label htmlFor="blueprint-name" className="form-label"><strong>Name</strong></label>
						<Typeahead
							id="blueprint-name"
							labelKey="name"
							onChange={(item: any) => {
								onItemSelected(item[0]);
							}}
							options={map(arkItemMaterials, 'Item')}
							placeholder="Select blueprint..."
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="quality" className="form-label"><strong>Quality</strong></label>
						<select required id="quality" className="form-select" onChange={(e) => setItemQuality(e.target.value)}>
							{arkItemQualityTiers.map((qualityTier: any) => {
								return <option key={qualityTier.QualityTier} value={qualityTier.Name}>{qualityTier.Name}</option>
							})}
						</select>
					</div>

					{doesItemHaveArmor(selectedItem) ? <div className="mb-3">
						<label htmlFor="armor" className="form-label"><strong>Armor</strong></label>
						<input type="number" step="0.1" min={25} id="armor" className="form-control" onInput={
							(e) => setArmorRating(parseFloat((e.target as HTMLInputElement).value))
						} />
					</div> : <></>}

					{doesItemHaveDamage(selectedItem) ? <div className="mb-3">
						<label htmlFor="damage" className="form-label"><strong>Damage</strong></label>
						<input type="number" step="0.1" min={100} max={298} id="damage" className="form-control" onInput={
							(e) => setDamageRating(parseFloat((e.target as HTMLInputElement).value))
						} />
					</div> : <></>}

					{doesItemHaveDurability(selectedItem) ? <div className="mb-3">
						<label htmlFor="durability" className="form-label"><strong>Durability</strong></label>
						<input type="number" min={0} step={1.0} id="durability" className="form-control" onInput={
							(e) => setDurabilityRating(parseFloat((e.target as HTMLInputElement).value))
						} />
					</div> : <></>}

					{materials.length > 0 ? <>
						<strong>Cost Breakdown</strong>
						<hr />

						{materials.map((material: string) => {
							return <div key={material} className="mb-3">
								<div className="row">
									<div className="col-sm">
										<label htmlFor={"material["+material+"]"} className="form-label"><strong>{material}</strong></label>
									</div>
									<div className="col-sm">
										<input id={"material["+material+"]"} type="number" className="w-100" onChange={
											(e) => {
												const _materialsCount: {[index:string] : number} = cloneDeep(materialsCount);
												_materialsCount[material] = parseInt(e.target.value);
												setMaterialsCount(_materialsCount);
											}
										} />
									</div>
								</div>
							</div>
						})}
					</> : <></>}

					<div className="mb-3">
						<label className="form-label" htmlFor="comment"><strong>Comment</strong></label>
						<textarea className="form-control" id="comment" value={comment} onChange={
							(e) => {
								setComment(e.target.value);
							}
						} />
					</div>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => handleClose(false)}>
					<FontAwesomeIcon icon={faTimes} /> {props.closeLabel || "Close"}
				</Button>
				<Button variant="primary" onClick={() => handleClose(true)}>
					<FontAwesomeIcon icon={faCheck} /> {props.confirmLabel || "Confirm"}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}