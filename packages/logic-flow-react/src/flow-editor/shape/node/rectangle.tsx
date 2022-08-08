import { HtmlNodeModel, HtmlNode } from '@logicflow/core';
import React from 'react';
import ReactDOM from 'react-dom';
import './uml.css';
import './rectangle.css';

function Rectangle(props) {
  return (
    <>
      <div className="table-node table-color-2">
        <div className="table-name">Students</div>
        <div className="table-feild">
          <span>id</span>
          <span className="feild-type">string</span>
        </div>
        <div className="table-feild">
          <span>name</span>
          <span className="feild-type">string</span>
        </div>
        <div className="table-feild">
          <span>age</span>
          <span className="feild-type">integer</span>
        </div>
      </div>
    </>
  )
}

class RectangleModel extends HtmlNodeModel {
  setAttributes() {
    this.text.editable = false;
    const width = 200;
    const height = 116;
    this.width = width;
    this.height = height;
    this.anchorsOffset = [
      [width / 2, 0],
      [0, height / 2],
      [-width / 2, 0],
      [0, -height/2],
    ]
  }
}
class RectangleNode extends HtmlNode {
  setHtml(rootEl: HTMLElement) {
    const { properties } = this.props.model;
    rootEl.setAttribute("class", "table-container");
    ReactDOM.render(<Rectangle name={properties.name} body={properties.body}/>, rootEl);
  }
}

const rectangle = {
  type: 'rectangle',
  view: RectangleNode,
  model: RectangleModel
}

export default rectangle;
