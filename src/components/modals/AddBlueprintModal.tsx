// SPDX-License-Identifier: MIT
import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { map, sortBy, forEach, keys, cloneDeep } from "lodash";
import { Typeahead } from "react-bootstrap-typeahead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import Blueprint from "../../models/Blueprint";
import BlueprintMaterialCost from "../../models/BlueprintMaterialCost";
import doesItemHaveArmor from "../../utils/doesItemHaveArmor";
import doesItemHaveDamage from "../../utils/doesItemHaveDamage";

import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.min.css";
import doesItemHaveDurability from "../../utils/doesItemHaveDurability";

let arkItemQualityTiers = require("../../data/ark-item-quality-tiers.json");
arkItemQualityTiers = sortBy(arkItemQualityTiers, "QualityTier");
let arkItemMaterials = require("../../data/ark-item-materials.json");
arkItemMaterials = sortBy(arkItemMaterials, "Item");
const itemNames = map(arkItemMaterials, "Item");

function getItemToMaterialsDictionary(
  arkItemMaterials: { Item: string; Materials: string[] }[]
) {
  const dict: { [index: string]: string[] } = {};
  forEach(arkItemMaterials, function (arkItemMaterial) {
    dict[arkItemMaterial.Item] = arkItemMaterial.Materials;
  });
  return dict;
}

const arkItemMaterialsArrayByItem =
  getItemToMaterialsDictionary(arkItemMaterials);

/**
 * @param {number} number
 * @return {number|undefined}
 */
function undefinedIfNaN(number: number) {
  if (isNaN(number)) {
    return undefined;
  }
  return number;
}

export default function AddBlueprintModal(props: {
  closeLabel?: string;
  confirmLabel?: string;
  onCallback: Function;
  existingBlueprint?: Blueprint;
}) {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [errorAlertMessage, setErrorAlertMessage] = useState<
    string | undefined
  >(undefined);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [itemQuality, setItemQuality] = useState<string>("Primitive");
  const [materials, setMaterials] = useState<string[]>([]);
  const [materialsCount, setMaterialsCount] = useState<{
    [index: string]: number;
  }>({});
  const [formField_armorRating, setFormField_ArmorRating] =
    useState<string>("");
  const [formField_damageRating, setFormField_DamageRating] =
    useState<string>("");
  const [formField_durabilityRating, setFormField_DurabilityRating] =
    useState<string>("");
  const [comment, setComment] = useState<string | undefined>(undefined);

  function isBlueprintSelected() {
    return selectedItem !== "";
  }

  useEffect(
    function () {
      function _getMaterialsCountDict(materialCosts: BlueprintMaterialCost[]) {
        const _dict: { [index: string]: number } = {};
        for (let i = 0; i < materialCosts.length; i++) {
          _dict[materialCosts[i].name] = materialCosts[i].cost;
        }
        return _dict;
      }

      if (props.existingBlueprint) {
        setEditMode(true);
        //console.log(keyBy(props.existingBlueprint.materialCosts, 'name'));
        setSelectedItem(props.existingBlueprint.itemName);
        setItemQuality(props.existingBlueprint.quality);
        if (props.existingBlueprint.materialCosts) {
          setMaterials(map(props.existingBlueprint.materialCosts, "name"));
          setMaterialsCount(
            _getMaterialsCountDict(props.existingBlueprint.materialCosts)
          );
        }
        setFormField_ArmorRating(
          props.existingBlueprint.armor?.toString() || ""
        );
        setFormField_DamageRating(
          props.existingBlueprint.damage?.toString() || ""
        );
        setFormField_DurabilityRating(
          props.existingBlueprint.durability?.toString() || ""
        );
        setComment(props.existingBlueprint.comment);
      }
    },
    [props.existingBlueprint]
  );

  function handleClose(save: boolean) {
    if (save) {
      if (!isBlueprintSelected()) {
        setErrorAlertMessage("Please fix validation errors before continuing.");
        return;
      }

      setErrorAlertMessage(undefined);

      const materialsKeys = sortBy(keys(materialsCount));
      const materialCosts: BlueprintMaterialCost[] = [];
      for (let i = 0; i < materialsKeys.length; i++) {
        const materialsKey = materialsKeys[i];
        materialCosts.push({
          name: materialsKey,
          cost: materialsCount[materialsKey],
        });
      }

      let blueprint: Blueprint = {
        itemName: selectedItem,
        quality: itemQuality,
        armor: undefinedIfNaN(parseFloat(formField_armorRating)),
        damage: undefinedIfNaN(parseFloat(formField_damageRating)),
        durability: undefinedIfNaN(parseInt(formField_durabilityRating)),
        materialCosts: materialCosts,
        comment: comment,
      };
      if (props.existingBlueprint) {
        blueprint.uuid = props.existingBlueprint.uuid;
        blueprint.createdAt = props.existingBlueprint.createdAt;
      }
      props.onCallback(blueprint);
    } else {
      props.onCallback(undefined);
    }
    setShowModal(false);
  }

  function onItemSelected(itemName: string) {
    const foundMaterials = arkItemMaterialsArrayByItem[itemName];
    if (foundMaterials) {
      setSelectedItem(itemName);
      // Reset these values to make sure an armor item doesn't have damage, etc.
      setFormField_ArmorRating("");
      setFormField_DamageRating("");
      setFormField_DurabilityRating("");
      setMaterials(foundMaterials);
    }
  }

  return (
    <Modal show={showModal} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{!isEditMode ? "Add" : "Edit"} Blueprint</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorAlertMessage ? (
          <div className="alert alert-danger">{errorAlertMessage}</div>
        ) : (
          <></>
        )}
        <form id="createClusterModalForm needs-validation">
          <div className="mb-3">
            <label htmlFor="blueprint-name" className="form-label">
              <strong>Name</strong>
            </label>
            {/* https://github.com/ericgio/react-bootstrap-typeahead/blob/main/docs/API.md */}
            <Typeahead
              id="blueprint-name"
              labelKey="name"
              onChange={(item) => {
                if (item.length === 0) {
                  setSelectedItem("");
                  setMaterials([]);
                  setMaterialsCount({});
                } else if (item.length > 0) {
                  onItemSelected(item[0].toString());
                  if (errorAlertMessage !== undefined) {
                    setErrorAlertMessage(undefined);
                  }
                }
              }}
              options={itemNames}
              placeholder="Select blueprint..."
              selected={selectedItem !== "" ? [selectedItem] : []}
              clearButton={true}
              highlightOnlyResult={true}
              disabled={isEditMode}
              className={isBlueprintSelected() ? "is-valid" : "is-invalid"}
              isInvalid={!isBlueprintSelected()}
              isValid={isBlueprintSelected()}
              inputProps={
                !isBlueprintSelected()
                  ? { "aria-describedby": "invalidSelectedBlueprint" }
                  : {}
              }
            />
            <div id="invalidSelectedBlueprint" className="invalid-feedback">
              This field is required.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="quality" className="form-label">
              <strong>Quality</strong>
            </label>
            <select
              required
              id="quality"
              className="form-select"
              value={itemQuality}
              onChange={(e) => setItemQuality(e.target.value)}
            >
              {arkItemQualityTiers.map((qualityTier: any) => {
                return (
                  <option
                    key={qualityTier.QualityTier}
                    value={qualityTier.Name}
                  >
                    {qualityTier.Name}
                  </option>
                );
              })}
            </select>
          </div>

          {doesItemHaveArmor(selectedItem) ? (
            <div className="mb-3">
              <label htmlFor="armor" className="form-label">
                <strong>Armor</strong>
              </label>
              <input
                type="number"
                step="0.1"
                min={25}
                id="armor"
                className="form-control"
                value={formField_armorRating}
                onChange={(e) => setFormField_ArmorRating(e.target.value)}
              />
            </div>
          ) : (
            <></>
          )}

          {doesItemHaveDamage(selectedItem) ? (
            <div className="mb-3">
              <label htmlFor="damage" className="form-label">
                <strong>Damage</strong>
              </label>
              <input
                type="number"
                step="0.1"
                min={100}
                max={298}
                id="damage"
                className="form-control"
                value={formField_damageRating}
                onChange={(e) => setFormField_DamageRating(e.target.value)}
              />
            </div>
          ) : (
            <></>
          )}

          {doesItemHaveDurability(selectedItem) ? (
            <div className="mb-3">
              <label htmlFor="durability" className="form-label">
                <strong>Durability</strong>
              </label>
              <input
                type="number"
                min={0}
                step="1.0"
                id="durability"
                className="form-control"
                value={formField_durabilityRating}
                onChange={(e) => setFormField_DurabilityRating(e.target.value)}
              />
            </div>
          ) : (
            <></>
          )}

          {materials.length > 0 ? (
            <>
              <strong>Cost Breakdown</strong>
              <hr />

              {materials.map((material: string) => {
                return (
                  <div key={material} className="mb-3">
                    <div className="row">
                      <div className="col-sm">
                        <label
                          htmlFor={"material[" + material + "]"}
                          className="form-label"
                        >
                          <strong>{material}</strong>
                        </label>
                      </div>
                      <div className="col-sm">
                        <input
                          id={"material[" + material + "]"}
                          type="number"
                          min={0}
                          className="w-100"
                          value={materialsCount[material] || ""}
                          onChange={(e) => {
                            const _materialsCount: { [index: string]: number } =
                              cloneDeep(materialsCount);
                            _materialsCount[material] = parseInt(
                              e.target.value
                            );
                            setMaterialsCount(_materialsCount);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}

          <div className="mb-3">
            <label className="form-label" htmlFor="comment">
              <strong>Comment</strong>
            </label>
            <textarea
              className="form-control"
              id="comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
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
