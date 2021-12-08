import { NodeId, Node } from "../models/node";
import { Path } from "../models/path";

const svgNs = "http://www.w3.org/2000/svg";

export const drawMap = (nodes: Map<NodeId, Node>, parent: HTMLDivElement, nodeClickHandler: (nodeId: NodeId) => () => void) => {
    const map = document.getElementById("map")!;
    const circles = [];
    const lines = [];

    for (const [nodeId, node] of nodes) {
        if (node.active) {
            const circle = document.createElementNS(svgNs, "circle");
            circle.setAttribute("cx", String(node.x));
            circle.setAttribute("cy", String(node.y));
            circle.setAttribute("fill", "transparent");
            circle.setAttribute("r", "0.006");
            circle.addEventListener("click", nodeClickHandler(nodeId))
            circles.push(circle);
            for (const id of node.linksTo) {
                if (nodes.get(id)!.active) {
                    const line = document.createElementNS(svgNs, "line");
                    line.setAttribute("x1", String(node.x));
                    line.setAttribute("y1", String(node.y));
                    line.setAttribute("x2", String(nodes.get(id)!.x));
                    line.setAttribute("y2", String(nodes.get(id)!.y));
                    line.setAttribute("stroke", "blue");
                    line.setAttribute("stroke-width", "0.001");
                    lines.push(line);
                }
            }
        }
    }

    lines.forEach(line => map.append(line));
    circles.forEach(circle => map.append(circle));
    parent.appendChild(map);
}

export const drawOrigin = (nodes: Map<NodeId, Node>, nodeId: NodeId) => {
    const map = document.getElementById("map")!;
    const circle = document.createElementNS(svgNs, "circle");
    circle.setAttribute("cx", String(nodes.get(nodeId)!.x));
    circle.setAttribute("cy", String(nodes.get(nodeId)!.y));
    circle.setAttribute("fill", "green");
    circle.setAttribute("r", "0.006");
    map.append(circle);
}

export const drawDestination = (nodes: Map<NodeId, Node>, nodeId: NodeId) => {
    const map = document.getElementById("map")!;
    const circle = document.createElementNS(svgNs, "circle");
    circle.setAttribute("cx", String(nodes.get(nodeId)!.x));
    circle.setAttribute("cy", String(nodes.get(nodeId)!.y));
    circle.setAttribute("fill", "red");
    circle.setAttribute("r", "0.006");
    map.append(circle);
}

export const drawPath = (nodes: Map<NodeId, Node>, paths: Map<NodeId, Path>, destination: NodeId) => {
    const map = document.getElementById("map")!;
    let from = destination;
    let to = paths.get(destination)!.comingFrom;
    let points = "";
    while (from !== to) {
        points += `${nodes.get(from)!.x},${nodes.get(from)!.y} `
        from = to;
        to = paths.get(from)!.comingFrom;
    }
    points += `${nodes.get(to)!.x},${nodes.get(to)!.y}`

    const polyline = document.createElementNS(svgNs, "polyline");
    polyline.setAttribute("points", points);
    polyline.setAttribute("fill", "transparent");
    polyline.setAttribute("stroke", "orange");
    polyline.setAttribute("stroke-width", "0.004");
    map.append(polyline);
}