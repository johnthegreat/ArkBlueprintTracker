import React, { createContext } from "react";
import Blueprint from "../models/Blueprint";

export interface BlueprintReducerAction {
  type: string;
  payload?: Blueprint[];
}

interface BlueprintsDispatchType {
  dispatch: React.Dispatch<BlueprintReducerAction>;
}

export const BlueprintsDispatchContext = createContext<
  BlueprintsDispatchType | undefined
>(undefined);
