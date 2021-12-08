import { Node } from "../models/node";

const calculateDistance = (node1: Node, node2: Node) => {
    return Math.pow(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2), 0.5)
}

export default calculateDistance;