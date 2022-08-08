import { HtmlNodeModel, HtmlNode } from '@logicflow/core';
import React from 'react';
import ReactDOM from 'react-dom';
import './rectangle-flow.css';
import appInit from '../../icons/app.svg';

function Rectangle(props) {
  const { name, status, svgs } = props;
  return (
    <>
      <div className="rect-node-table-node rect-node-table-color-1 rect-node-row">
        <div className="rect-node-col rect-node-col-6 rect-node-table-name">
        <img src={svgs[status]} width={32} height={32} />
        </div>
        <div className="rect-node-col rect-node-col-18 rect-node-table-name">{name}</div>
      </div>
    </>
  )
}

class RectangleModel extends HtmlNodeModel {
  setAttributes() {
    this.text.editable = false;
    const width = 200;
    const height = 80;
    this.width = width;
    this.height = height;
    // const targetRule = {
    //   message: "只允许从下边的锚点连出",
    //   validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
    //     return sourceAnchor.type === "bottom";
    //   }
    // };
    // this.targetRules.push(targetRule);

    const sourceRule = {
      message: "只允许从下边的锚点连出",
      validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
        return targetAnchor.type === "top";
      }
    };;
    this.sourceRules.push(sourceRule);
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
class RectangleNode extends HtmlNode {
  setHtml(rootEl: HTMLElement) {
    const { properties } = this.props.model;
    rootEl.setAttribute("class", "rect-node-table-container");
    ReactDOM.render(<Rectangle name={properties.name} svgs={properties.svgs} status={properties.status} />, rootEl);
  }
}

const rectNode = {
  type: 'rect-node',
  view: RectangleNode,
  model: RectangleModel
}

export default rectNode;
