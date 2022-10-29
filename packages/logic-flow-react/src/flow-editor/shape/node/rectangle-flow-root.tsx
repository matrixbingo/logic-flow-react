import { RectangleModel, RectangleNode } from './rectangle-flow';
import './rectangle-flow.less';

class RootRectangleModel extends RectangleModel {

  getDefaultAnchor() {
    const { width, height, x, y, id } = this;
    return [
      {
        x,
        y: y + height / 2,
        type: 'bottom',
        id: `${id}_1`
      },
    ]
  }
};

class RootRectangleNode extends RectangleNode {};

const rootNode = {
  type: 'root-node',
  view: RootRectangleNode,
  model: RootRectangleModel
}

export default rootNode;
