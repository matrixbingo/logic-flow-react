import LogicFlow, { GraphModel } from "@logicflow/core";
import { message } from "antd";

let selected = null;

function translationNodeData(nodeData, distance) {
  nodeData.x += distance;
  nodeData.y += distance;
  if (nodeData.text) {
    nodeData.text.x += distance;
    nodeData.text.y += distance;
  }
  return nodeData;
}

function translationEdgeData(edgeData, distance) {
  if (edgeData.startPoint) {
    edgeData.startPoint.x += distance;
    edgeData.startPoint.y += distance;
  }
  if (edgeData.endPoint) {
    edgeData.endPoint.x += distance;
    edgeData.endPoint.y += distance;
  }
  if (edgeData.pointsList && edgeData.pointsList.length > 0) {
    edgeData.pointsList.forEach((point) => {
      point.x += distance;
      point.y += distance;
    });
  }
  if (edgeData.text) {
    edgeData.text.x += distance;
    edgeData.text.y += distance;
  }
  return edgeData;
}

const TRANSLATION_DISTANCE = 40;

export function initDefaultShortcut(lf: LogicFlow, graph: GraphModel) {
  const { keyboard } = lf;
  const { options: { keyboard: keyboardOptions } } = keyboard;

  // 复制
  keyboard.on(['cmd + c', 'ctrl + c'], () => {
    if (!keyboardOptions.enabled) return;
    if (graph.textEditElement) return;
    const { guards } = lf.options;
    const elements = graph.getSelectElements(false);
    const enabledClone = guards && guards.beforeClone ? guards.beforeClone(elements) : true;
    if (!enabledClone) {
      selected = null;
      return false;
    }
    const node = elements.nodes.find((node) => node.properties.copy === false);
    if(node){
      message.error(node.properties.name + '不能复制！');
      return false;
    }
    selected = elements;
    selected.nodes.forEach(node => translationNodeData(node, TRANSLATION_DISTANCE));
    selected.edges.forEach(edge => translationEdgeData(edge, TRANSLATION_DISTANCE));
    return false;
  });

  // 粘贴
  keyboard.on(['cmd + v', 'ctrl + v'], () => {
    if (!keyboardOptions.enabled) return;
    if (graph.textEditElement) return;
    if (selected && (selected.nodes || selected.edges)) {
      lf.clearSelectElements();
      const addElements = lf.addElements(selected);
      if (!addElements) return;
      addElements.nodes.forEach(node => lf.selectElementById(node.id, true));
      addElements.edges.forEach(edge => lf.selectElementById(edge.id, true));
      selected.nodes.forEach(node => translationNodeData(node, TRANSLATION_DISTANCE));
      selected.edges.forEach(edge => translationEdgeData(edge, TRANSLATION_DISTANCE));
    }
    return false;
  });
  // undo
  keyboard.on(['cmd + z', 'ctrl + z'], () => {
    if (!keyboardOptions.enabled) return;
    if (graph.textEditElement) return;
    lf.undo();
    return false;
  });
  // redo
  keyboard.on(['cmd + y', 'ctrl + y'], () => {
    if (!keyboardOptions.enabled) return;
    if (graph.textEditElement) return;
    lf.redo();
    return false;
  });
  // delete
  keyboard.on(['backspace', 'del', 'delete'], () => {
    if (!keyboardOptions.enabled) return;
    if (graph.textEditElement) return;
    const elements = graph.getSelectElements(true);
    const node = elements.nodes.find((node) => node.properties.delete === false);
    lf.clearSelectElements();
    if(node){
      message.error(node.properties.name + '不能删除！');
      return false;
    }
    elements.edges.forEach(edge => lf.deleteEdge(edge.id));
    elements.nodes.forEach(node => lf.deleteNode(node.id));
    return false;
  });
}
