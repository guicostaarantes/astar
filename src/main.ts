import { NodeId } from './models/node';
import './style.css'
import createSquareMap from './utils/createSquareMap'
import { drawDestination, drawMap, drawOrigin } from './utils/drawMap';

const nodes = createSquareMap(30);

const app = document.querySelector<HTMLDivElement>('#app')!

let origin: NodeId | undefined;
let destination: NodeId | undefined;

const nodeClickHandler = (nodeId: number) => () => {
  if (!origin) {
    drawOrigin(nodes, nodeId);
    origin = nodeId;
    return;
  }
  if (!destination) {
    drawDestination(nodes, nodeId);
    destination = nodeId;
    return;
  }
}

drawMap(nodes, app, nodeClickHandler);
