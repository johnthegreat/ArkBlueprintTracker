// SPDX-License-Identifier: MIT
import apiHelper from "../utils/apiHelper";
import Blueprint from "../models/Blueprint";

export default class BlueprintProvider {
  private readonly apiBaseUrl: string;
  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  getBlueprints(): Promise<Blueprint[]> {
    return apiHelper<Blueprint[]>(
      fetch(`${this.apiBaseUrl}/blueprint?_sort=itemName&_order=asc`)
    );
  }

  getBlueprintByUuid(uuid: string): Promise<Blueprint> {
    return apiHelper<Blueprint>(fetch(`${this.apiBaseUrl}/blueprint/${uuid}`));
  }

  getBlueprintsWithSearchQuery(query?: string): Promise<Blueprint[]> {
    if (!query) {
      return this.getBlueprints();
    } else {
      return apiHelper<Blueprint[]>(
        fetch(
          `${this.apiBaseUrl}/blueprint?q=${encodeURIComponent(
            query
          )}&_sort=itemName&_order=asc`
        )
      );
    }
  }

  createBlueprint(blueprint: Blueprint): Promise<Blueprint> {
    return apiHelper<Blueprint>(
      fetch(`${this.apiBaseUrl}/blueprint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blueprint),
      })
    );
  }

  updateBlueprint(blueprint: Blueprint): Promise<Blueprint> {
    return apiHelper<Blueprint>(
      fetch(`${this.apiBaseUrl}/blueprint/${blueprint.uuid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blueprint),
      })
    );
  }

  deleteBlueprint(blueprintUuid: string) {
    return apiHelper<any>(
      fetch(`${this.apiBaseUrl}/blueprint/${blueprintUuid}`, {
        method: "DELETE",
      })
    );
  }
}
