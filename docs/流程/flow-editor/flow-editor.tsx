
import React, { useRef } from 'react';
import { FlowEdtor } from 'logic-flow-react';
import appInit from './icons/app.svg';
import type { MenuProps } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

const Demo: React.FC = () => {

  const createMenuItems = (): MenuProps['items'] => {
    return [
      {
        key: 'key1',
        label: 'subnav_key0',

        children: [
          {
            key: 'subKey1',
            label: 'option_subKey1',
            icon: <img src={appInit} width={14} height={14} />,
            style: { paddingLeft: 32 }
          },
          {
            key: 'subKey2',
            label: 'option_subKey2',
            icon: React.createElement(UserOutlined),
            style: { paddingLeft: 32 }
          }
        ]
      }
    ]
  }

  const data = {
    nodes: [
      {
        id: 1,
        type: 'rect-node',
        x: 350,
        y: 100,
        properties: {
          name: '11',
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


  const onClick = (key) =>{
    window.console.log('---------------->', key);
  }

  return (
    <>
      <FlowEdtor itemPanel={ { items: createMenuItems(), onClick } } logicFlowGraph={{ defaultGraphData: data }} >
        <span>33333</span>
      </FlowEdtor>
    </>
  );
};

export default Demo;

