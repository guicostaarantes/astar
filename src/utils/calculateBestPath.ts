import { NodeId, Node } from "../models/node";
import { Path } from "../models/path";
import calculateDistance from "./calculateDistance";

const calculateBestPath = (nodes: Map<NodeId, Node>, origin: NodeId, destination: NodeId) => {
    const paths: Map<NodeId, Path> = new Map();
    paths.set(
        origin,
        {
            distanceTraveled: 0,
            comingFrom: origin,
            distanceToDestination: calculateDistance(
                nodes.get(origin)!,
                nodes.get(destination)!
            ),
            closed: false,
        }
    )

    let calculatingFromNode: NodeId = origin;

    while (calculatingFromNode !== destination) {
        for (const id of nodes.get(calculatingFromNode)!.linksTo) {
            if (nodes.get(id)!.active) {
                const existingPathToNode = paths.get(id);
                const distanceTraveledUntilNode = paths.get(calculatingFromNode)!.distanceTraveled + calculateDistance(nodes.get(calculatingFromNode)!, nodes.get(id)!)
                if (!existingPathToNode || existingPathToNode.distanceTraveled > distanceTraveledUntilNode) {
                    paths.set(
                        id,
                        {
                            distanceTraveled: distanceTraveledUntilNode,
                            comingFrom: calculatingFromNode,
                            distanceToDestination: calculateDistance(nodes.get(id)!, nodes.get(destination)!),
                            closed: false,
                        }
                    )
                }
            }
        }

        paths.get(calculatingFromNode)!.closed = true;

        let nextNodeToCalculate: NodeId = calculatingFromNode;
        let sumOfDistances;
        for (const [nodeId, path] of paths) {
            if (!path.closed) {
                if (!sumOfDistances || sumOfDistances > paths.get(nodeId)!.distanceTraveled + paths.get(nodeId)!.distanceToDestination) {
                    nextNodeToCalculate = nodeId;
                    sumOfDistances = paths.get(nodeId)!.distanceTraveled + paths.get(nodeId)!.distanceToDestination;
                }
            }
        }

        calculatingFromNode = nextNodeToCalculate;
    }

    return paths;
}

export default calculateBestPath;