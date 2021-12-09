import { NodeId } from "./node";

export type Path = {
    distanceToDestination: number;
    distanceTraveled: number;
    comingFrom: NodeId;
};