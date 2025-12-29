import { createContext } from "react";
import Blueprint from "../models/Blueprint";

export const BlueprintsContext = createContext<Blueprint[]>([]);
