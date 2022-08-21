import { HtmlNodeModel, HtmlNode } from '@logicflow/core';
import { Button } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import { hasParenNode } from '../../util/validate';
import './rectangle-flow.css';

export function Rectangle(props) {
  const { name, status, svgs } = props;
  const  className = "rect-node-table-node rect-node-row rect-node-table-color-" + status;
  return (
    <>
      <div className={className}>
        <div className="rect-node-col rect-node-col-6 rect-node-table-name">
        <img src={svgs[status]} width={32} height={32} />
        </div>
        <div className="rect-node-col rect-node-col-18 rect-node-table-name">{name}</div>
      </div>
    </>
  )
}

const sourceRules = [
  {
    message: "只允许从下边的锚点连出",
    validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => targetAnchor.type === "top"
  },
  {
    message: "不能自连接",
    validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => sourceNode.id !== targetNode.id
  },
  {
    message: "一个节点只能被一个节点连接",
    validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
      const { nodes, edges } = targetNode.incoming;
      return nodes?.length === 0;
    }
  },
  {
    message: "不能连接父节点",
    validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
      const { id : sourceId } = sourceNode;
      const has = hasParenNode(sourceNode, targetNode);
      return !has;
    }
  }
];

export class RectangleModel extends HtmlNodeModel {
  setAttributes() {
    this.text.editable = false;
    const width = 200;
    const height = 80;
    this.width = width;
    this.height = height;

    sourceRules.forEach(sourceRule => this.sourceRules.push(sourceRule));

    const targetRule = {
      message: "一个节点只能被一个节点连接",
      validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
        const { nodes, edges } = targetNode.incoming;
        window.console.log('nodes, edges --->', nodes, edges);
        return nodes?.length === 1 && edges?.length === 1;
      }
    };
    //this.targetRules.push(targetRule)
  }
  getDefaultAnchor() {
    const { width, height, x, y, id } = this;
    return [
      {
        x,
        y: y - height / 2,
        type: 'top',
        edgeAddable: false, // 控制锚点是否可以从此锚点手动创建连线。默认为true。
        id: `${id}_0`
      },
      {
        x,
        y: y + height / 2,
        type: 'bottom',
        id: `${id}_1`
      },
    ]
  }
}

export class RectangleNode extends HtmlNode {
  setHtml(rootEl: HTMLElement) {
    const { properties } = this.props.model;
    rootEl.setAttribute("class", "rect-node-table-container");
    ReactDOM.render(<Rectangle {...properties} />, rootEl);
  }
}

const rectNode = {
  type: 'rect-node',
  view: RectangleNode,
  model: RectangleModel
}

export default rectNode;
