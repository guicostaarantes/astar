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
        }
    )

    let calculatingFromNode: NodeId = origin;
    let openPaths: Array<NodeId> = [origin];

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
                        }
                    )
                    openPaths.push(id)
                }
            }
        }

        openPaths = openPaths.filter(id => calculatingFromNode !== id)

        if (openPaths.length === 0) {
            throw new Error("No solution");
        }

        let nextNodeToCalculate: NodeId = calculatingFromNode;
        let sumOfDistances;
        for (const nodeId of openPaths) {
            if (!sumOfDistances || sumOfDistances > paths.get(nodeId)!.distanceTraveled + paths.get(nodeId)!.distanceToDestination) {
                nextNodeToCalculate = nodeId;
                sumOfDistances = paths.get(nodeId)!.distanceTraveled + paths.get(nodeId)!.distanceToDestination;
            }
        }

        calculatingFromNode = nextNodeToCalculate;
    }

    return paths;
}

export default calculateBestPath;