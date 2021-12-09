export type NodeId = number;

export type Node = {
  x: number;
  y: number;
  active: boolean;
  linksTo: Array<NodeId>;
};
