
import React, { useRef, useState } from 'react';
import { FlowEditor, rectNode, rootNode } from 'logic-flow-react';
import appInit from './icons/app.svg';
import { Drawer, MenuProps } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import LogicFlow from "@logicflow/core";
import 'antd/dist/antd.css';

declare global {  //设置全局属性
  interface Window {
    readonly lf: LogicFlow;
  }
}

const defaultGraphNode = {
  subKey1: {
    type: 'rect-node',
    properties: {
      name: '1',
      status: '3',
      svgs: { init: appInit }
    },
  },
  subKey2: {
    type: 'rect-node',
    properties: {
      name: '2',
      status: '4',
      svgs: { init: appInit }
    },
  },
};


const Demo: React.FC = () => {

  const createMenuItems = (): MenuProps['items'] => {
    return [
      {
        key: 'key1',
        label: 'subnav_key1',

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

  const defaultGraphData = {
    nodes: [
      {
        id: 1,
        type: 'rect-node',
        x: 350,
        y: 100,
        properties: {
          name: '1',
          status: '4',
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
          status: 'pending',
          svgs: { init: appInit }
        },
      },
      {
        id: 3,
        type: 'rect-node',
        x: 450,
        y: 300,
        properties: {
          name: '3',
          status: 'init',
          svgs: { init: appInit }
        },
      },
      {
        id: 4,
        type: 'rect-node',
        x: 650,
        y: 300,
        properties: {
          name: '4',
          status: 'done',
          svgs: { init: appInit }
        },
      },
      {
        id: 5,
        type: 'root-node',
        x: 850,
        y: 300,
        properties: {
          name: '5',
          status: 'init',
          delete: false,
          copy: false,
          svgs: { init: appInit },
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

  const updateStatus = (id, status) => {

  }

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };


  const onClick = (key) =>{
    window.lf.setProperties('5', {status: 'done' });
    return true;

  }

  const event = (type, args) =>{
    if(type === 'node:dbclick'){
      showDrawer();
    }
    window.console.log('---------------->', type, args);
  }

  return (
    <>
      <FlowEditor defaultGraphNode={defaultGraphNode}
                  drawerProps={{ title: '111', width: '40%', onClose, visible }}
                  itemPanel={ { items: createMenuItems() as any, onClick } }
                  logicFlowGraph={{ defaultGraphData, elements: [rectNode, rootNode], constructorOptions: { keyboard: { enabled: true } }, event}}
                  controlKeys={['zoom-out', 'zoom-in', 'reset', 'select']}>
        <div>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>
      </FlowEditor>
    </>
  );
};

export default Demo;

