// SPDX-License-Identifier: MIT
import Header from "./Header";
import { Outlet, useOutlet } from "react-router-dom";
import { BlueprintsContext } from "../contexts/BlueprintsContext";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import Blueprint from "../models/Blueprint";
import {
  each,
  filter,
  first,
  indexOf,
  isUndefined,
  map,
  sortBy,
  uniq,
  without,
} from "lodash";

import BlueprintProvider from "../apis/BlueprintProvider";
import { ServersContext } from "../contexts/ServersContext";
import {
  BlueprintsDispatchContext,
  BlueprintReducerAction,
} from "../contexts/BlueprintsDispatchContext";
import App from "../App";

const blueprintProvider = new BlueprintProvider(
  // @ts-ignore
  process.env.REACT_APP_API_BASE_URL
);

const reducer = function (state: Blueprint[], action: BlueprintReducerAction) {
  if (!action.payload) {
    return [];
  }

  switch (action.type) {
    case "Set":
      return action.payload;
    case "Add":
      return [...state, ...action.payload];
    case "Update": {
      const changedUuids = map(action.payload, "uuid");
      return (
        filter(
          state.map(function (stateBlueprint) {
            if (indexOf(changedUuids, stateBlueprint.uuid)) {
              const _newBp = first(
                filter(action.payload, function (e) {
                  return e.uuid === stateBlueprint.uuid;
                })
              );
              if (!isUndefined(_newBp)) {
                return _newBp;
              }
            }
            return stateBlueprint;
          }),
          function (e) {
            return !isUndefined(e);
          }
        ) || []
      );
    }
    case "Delete": {
      return without(state, ...action.payload);
    }
    default:
      return state;
  }
};

export default function Root() {
  const childElement = useOutlet();

  const [blueprints, dispatch] = useReducer<
    React.Reducer<Blueprint[], BlueprintReducerAction>
  >(reducer, []);
  const [servers, setServers] = useState<string[]>([]);

  const getServersList = useCallback(
    function () {
      const servers: string[] = [];
      each(blueprints, function (blueprint) {
        if (blueprint.server) {
          servers.push(blueprint.server);
        }
      });
      return sortBy(uniq(servers));
    },
    [blueprints]
  );

  useEffect(function () {
    blueprintProvider.getBlueprints().then(function (blueprints) {
      dispatch({
        type: "Set",
        payload: blueprints,
      });
    });
  }, []);

  useEffect(() => {
    setServers(getServersList());
  }, [blueprints, getServersList]);

  return (
    <>
      <Header />
      <ServersContext.Provider value={servers}>
        <BlueprintsContext.Provider value={blueprints}>
          <BlueprintsDispatchContext.Provider
            value={{
              dispatch: dispatch,
            }}
          >
            <main className="container-fluid px-5">
              {childElement || <App />}
            </main>
          </BlueprintsDispatchContext.Provider>
        </BlueprintsContext.Provider>
      </ServersContext.Provider>
    </>
  );
}
