import { NodeId } from './models/node';
import './style.css'
import calculateBestPath from './utils/calculateBestPath';
import createSquareMap from './utils/createSquareMap'
import { drawDestination, drawMap, drawOrigin, drawPath } from './utils/drawMap';

const nodes = createSquareMap(30);

const app = document.querySelector<HTMLDivElement>('#app')!

let origin: NodeId | undefined;
let destination: NodeId | undefined;

const nodeClickHandler = (nodeId: number) => () => {
  if (origin === undefined) {
    drawOrigin(nodes, nodeId);
    origin = nodeId;
    return;
  }
  if (destination === undefined) {
    drawDestination(nodes, nodeId);
    destination = nodeId;
    const paths = calculateBestPath(nodes, origin, destination);
    drawPath(nodes, paths, destination);
  }
}

drawMap(nodes, app, nodeClickHandler);
