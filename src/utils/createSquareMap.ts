import { NodeId, Node } from '../models/node'

const findSquareLinks = (i: number, j: number, size: number) => {
    const nodeId = i * size + j;

    const links = [];

    if (i > 0 && j > 0) links.push(nodeId - size - 1);
    if (i > 0) links.push(nodeId - size);
    if (i > 0 && j < size - 1) links.push(nodeId - size + 1);
    if (j > 0) links.push(nodeId - 1);
    if (j < size - 1) links.push(nodeId + 1);
    if (i < size - 1 && j > 0) links.push(nodeId + size - 1);
    if (i < size - 1) links.push(nodeId + size);
    if (i < size - 1 && j < size - 1) links.push(nodeId + size + 1);

    return links;
}

const createSquareMap = (size: number) => {
    const nodes: Map<NodeId, Node> = new Map();

    for (const i of [...Array(size).keys()]) {
        for (const j of [...Array(size).keys()]) {
            nodes.set(
                i * size + j,
                {
                    x: (i + 0.5) / size,
                    y: (j + 0.5) / size,
                    active: Math.random() > 0.5,
                    linksTo: findSquareLinks(i, j, size),
                }
            )
        }
    }

    return nodes;
}

export default createSquareMap;