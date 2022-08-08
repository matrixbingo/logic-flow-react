/* eslint-disable react/react-in-jsx-scope */
import LogicFlow from '@logicflow/core';
import React from 'react';
import { useEffect, useRef } from 'react';
import '@logicflow/core/dist/style/index.css';
import rectNode from '../../shape/node/rectangle-flow';
import appInit from '../../icons/app.svg';

const data = {
  nodes: [
    {
      id: 1,
      type: 'rect-node',
      x: 350,
      y: 100,
      properties: {
        name: '1',
        status: 'init',
        svgs: { init: appInit }
      },
    },
    {
      id: 2,
      type: 'rect-node',
      x: 200,
      y: 300,
      properties: {
        name: '2',
        status: 'init',
        svgs: { init: appInit }
      },
    },
    {
      id: 3,
      type: 'rect-node',
      x: 450,
      y: 300,
      properties: {
        name: '2',
        status: 'init',
        svgs: { init: appInit }
      },
    }
  ],
  edges: [
    {
      sourceNodeId: 1,
      targetNodeId: 2,
      type: 'line',
    },
    {
      sourceNodeId: 1,
      targetNodeId: 3,
      type: 'line',
    },
  ],
};

export default function LogicFlowGraph() {
  const refContainer = useRef();

  useEffect(() => {
    const lf = new LogicFlow({
      container: refContainer.current,
      grid: true,
      width: 1000,
      height: 500,
    });
    lf.register(rectNode);
    lf.render(data);
  }, []);

  return <div className="App" ref={refContainer} />;
}
