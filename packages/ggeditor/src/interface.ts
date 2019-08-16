export type GraphType = 'flow' | 'mind';

export interface FlowNode {
  type: string;
  size: string;
  shape: string;
  color: string;
  label: string;
  x: number;
  y: number;
  id: string;
  index: number;
}

export interface FlowEdge {
  source: string;
  sourceAnchor: number;
  target: string;
  targetAnchor: number;
  id: string;
  index: number;
}
// tslint:disable-next-line: interface-name

export interface FlowProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface FlowStyle {
  height: number;
  width?: number;
}

export interface MindNode {
  label: string;
  children?: MindNode[];
}

export interface MindProps {
  roots: MindNode[];
}
