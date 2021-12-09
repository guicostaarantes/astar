import { NodeId } from './models/node';
import './style.css'
import calculateBestPath from './utils/calculateBestPath';
import createSquareMap from './utils/createSquareMap'
import { drawDestination, drawMap, drawOrigin, drawPath, eraseFromMap } from './utils/drawMap';

let origin: NodeId | undefined;
let destination: NodeId | undefined;
let drawings: Array<SVGElement> = [];

const setMap = () => {
  const nodes = createSquareMap(80);

  const nodeClickHandler = (nodeId: number) => () => {
    if (origin === undefined) {
      const originDrawing = drawOrigin(nodes, nodeId);
      origin = nodeId;
      drawings.push(originDrawing);
      return;
    }
    if (destination === undefined) {
      const destinationDrawing = drawDestination(nodes, nodeId);
      drawings.push(destinationDrawing);
      destination = nodeId;
      const paths = calculateBestPath(nodes, origin, destination);
      const pathDrawing = drawPath(nodes, paths, destination);
      drawings.push(pathDrawing);
    }
  }

  drawMap(nodes, nodeClickHandler);
}

setMap();

document.getElementById("new-map")!.addEventListener("click", () => {
  origin = undefined;
  destination = undefined;
  drawings = [];
  setMap();
});

document.getElementById("reset")!.addEventListener("click", () => {
  eraseFromMap(drawings);
  origin = undefined;
  destination = undefined;
  drawings = [];
});
