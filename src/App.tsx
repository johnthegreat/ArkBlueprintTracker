// SPDX-License-Identifier: MIT
import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {countBy, filter, first} from "lodash";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

import AddBlueprintModal from "./components/modals/AddBlueprintModal";
import ConfirmActionModal from "./components/modals/ConfirmActionModal";
import BlueprintCraftingCalculatorModal from "./components/modals/BlueprintCraftingCalculatorModal";

import Blueprint from "./models/Blueprint";
import Search from "./components/Search";
import BlueprintQualitySummaryBar from "./components/BlueprintQualitySummaryBar";
import RecentlyAddedBlueprintsWidget from "./components/RecentlyAddedBlueprintsWidget";
import DuplicateBlueprintsWidget from "./components/DuplicateBlueprintsWidget";

import BlueprintProvider from "./apis/BlueprintProvider";
import BlueprintLibraryPanelLeft from "./components/BlueprintLibraryPanelLeft";
import BlueprintLibraryPanelRight from "./components/BlueprintLibraryPanelRight";
// @ts-ignore
const blueprintProvider = new BlueprintProvider(process.env.REACT_APP_API_BASE_URL);

interface CountsByType {
	Primitive: number,
	Ramshackle: number,
	Apprentice: number,
	Journeyman: number,
	Mastercraft: number,
	Ascendant: number
}

function App() {
	const [allBlueprints, setAllBlueprints] = useState<Blueprint[]>([]);
	const [blueprintsToDisplay, setBlueprintsToDisplay] = useState<Blueprint[]>([]);
	const [showAddBlueprintModal, setShowAddBlueprintModal] = useState<boolean>(false);
	const [uuidPendingEdit, setUuidPendingEdit] = useState<string|undefined>(undefined);
	const [uuidPendingDeletion, setUuidPendingDeletion] = useState<string|undefined>(undefined);
	const [blueprintPendingCalculator, setBlueprintPendingCalculator] = useState<Blueprint|undefined>(undefined);
	const [searchText, setSearchText] = useState<string|undefined>(undefined);
	const [itemNameFilter, setItemNameFilter] = useState<string|undefined>(undefined);
	const [countsByType, setCountsByType] = useState<CountsByType>({
		Primitive: 0,
		Ramshackle: 0,
		Apprentice: 0,
		Journeyman: 0,
		Mastercraft: 0,
		Ascendant: 0
	});

	const _getBlueprintByUuid = function(blueprintUuid: string) {
		return first(filter(allBlueprints, { uuid: blueprintUuid }));
	};

	const loadBlueprints = useCallback(function(searchText) {
		blueprintProvider.getBlueprintsWithSearchQuery(searchText).then(function (blueprints) {
			setBlueprintsToDisplay(blueprints);
		});
	}, []);

	useEffect(function() {
		blueprintProvider.getBlueprints().then(function (blueprints) {
			setAllBlueprints(blueprints);
			setBlueprintsToDisplay(blueprints);

			const countsByQuality = countBy(blueprints, 'quality');
			setCountsByType({
				Primitive: countsByQuality['Primitive'] ?? 0,
				Ramshackle: countsByQuality['Ramshackle'] ?? 0,
				Apprentice: countsByQuality['Apprentice'] ?? 0,
				Journeyman: countsByQuality['Journeyman'] ?? 0,
				Mastercraft: countsByQuality['Mastercraft'] ?? 0,
				Ascendant: countsByQuality['Ascendant'] ?? 0
			});
		});
	}, []);

	useEffect(function() {
		loadBlueprints(searchText);
	}, [loadBlueprints, searchText]);

	useEffect(function() {
		if (itemNameFilter !== undefined) {
			setBlueprintsToDisplay(allBlueprints.filter(function (blueprint) {
				return blueprint.itemName === itemNameFilter;
			}));
		} else {
			setBlueprintsToDisplay(allBlueprints);
		}
	}, [itemNameFilter]);

	return (
		<div className="App">
			<header className="container-fluid px-5 mb-3">
				<h1>Ark Blueprint Database</h1>
			</header>

			<main className="container-fluid px-5">
				<BlueprintQualitySummaryBar primitiveCount={countsByType.Primitive}
											ramshackleCount={countsByType.Ramshackle}
											apprenticeCount={countsByType.Apprentice}
											journeymanCount={countsByType.Journeyman}
											mastercraftCount={countsByType.Mastercraft}
											ascendantCount={countsByType.Ascendant}
				/>

				<Button variant="primary" onClick={() => setShowAddBlueprintModal(true)} className="mb-3">
					<FontAwesomeIcon icon={faPlus} /> Add Blueprint
				</Button>

				{/*<div className="row row-cols-2 mb-3">
					<div className="col-6">
						<RecentlyAddedBlueprintsWidget blueprints={allBlueprints} quantityToShow={5} />
					</div>
					<div className="col-6">
						<DuplicateBlueprintsWidget blueprints={allBlueprints} />
					</div>
				</div>*/}

				<Search onSearch={function(searchText: string) {
					setSearchText(searchText);
					setItemNameFilter(undefined);
				}} />

				{allBlueprints.length > 0 ? <div className="row mb-3">
					<div className="d-none d-lg-block col-12 col-lg-4 col-xxl-3" style={{ maxHeight: "calc(100vh - 17rem)", overflowY: "scroll" }}>
						<BlueprintLibraryPanelLeft blueprints={allBlueprints} onItemNameClicked={
							(itemName: string) => {
								setItemNameFilter(itemName);
							}
						} activeItemName={itemNameFilter} />
					</div>
					<div className="col-12 col-lg-8 col-xxl-9" style={{ maxHeight: "calc(100vh - 17rem)", overflowY: "scroll" }}>
						<BlueprintLibraryPanelRight blueprints={blueprintsToDisplay}
							onCalculatorClicked={(blueprintUuid: string) => {
									blueprintProvider.getBlueprintByUuid(blueprintUuid).then(function(blueprint) {
										setBlueprintPendingCalculator(blueprint);
									});
								}
							}
							onDeleteClicked={
								(blueprintUuid: string) => setUuidPendingDeletion(blueprintUuid)
							}
							onEditClicked={
								(blueprintUuid: string) => setUuidPendingEdit(blueprintUuid)
							}
						/>
					</div>
				</div> : <></>}

				{/*<BlueprintsListCard blueprints={blueprints}
									onEditClicked={(blueprintUuid: string) => setUuidPendingEdit(blueprintUuid)}
									onDeleteClicked={(blueprintUuid: string) => setUuidPendingDeletion(blueprintUuid)}
									onCalculatorClicked={(blueprintUuid: string) => {
										blueprintProvider.getBlueprintByUuid(blueprintUuid).then(function(blueprint) {
											setBlueprintPendingCalculator(blueprint);
										});
									}}
				/>*/}

				{showAddBlueprintModal ? <AddBlueprintModal
					onCallback={(blueprint: Blueprint) => {
						if (blueprint) {
							blueprint.uuid = uuidv4();
							blueprint.createdAt = DateTime.utc().toISO();
							blueprintProvider.createBlueprint(blueprint).then(function() {
								loadBlueprints(searchText);
								setSearchText(undefined);
								setItemNameFilter(undefined);
							});
						}
						setShowAddBlueprintModal(false);
					}}
				/> : <></>}

				{uuidPendingEdit ? <AddBlueprintModal existingBlueprint={_getBlueprintByUuid(uuidPendingEdit)} onCallback={(blueprint: Blueprint) => {
					if (blueprint) {
						blueprintProvider.updateBlueprint(blueprint).then(function() {
							loadBlueprints(searchText);
							setSearchText(undefined);
							setItemNameFilter(undefined);
						});
					}
					setUuidPendingEdit(undefined);
				}} /> : <></>}

				{uuidPendingDeletion ?
					<ConfirmActionModal title="Confirm Delete Blueprint" message="Are you sure you want to delete this blueprint?" onCallback={(confirm: boolean) => {
						if (confirm) {
							blueprintProvider.deleteBlueprint(uuidPendingDeletion).finally(function() {
								loadBlueprints(searchText);
								setSearchText(undefined);
								setItemNameFilter(undefined);
								setUuidPendingDeletion(undefined);
							});
						} else {
							setUuidPendingDeletion(undefined);
						}
					}} />
				: <></>}

				{blueprintPendingCalculator ? <BlueprintCraftingCalculatorModal blueprint={blueprintPendingCalculator} onClose={
					() => {
						setBlueprintPendingCalculator(undefined);
					}
				} /> : <></>}
			</main>
		</div>
	);
}

export default App;
