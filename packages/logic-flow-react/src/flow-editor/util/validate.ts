import { BaseNodeModel } from "@logicflow/core";

export const hasParenNode = (sourceNode: BaseNodeModel, targetNode: BaseNodeModel) => {
  const { id : sourceId } = sourceNode;
  if(sourceId === targetNode.id){
    return true;
  };
  const nodes: BaseNodeModel[] = targetNode.outgoing.nodes;
  return nodes.some(node => hasParenNode(sourceNode, node));;
};
