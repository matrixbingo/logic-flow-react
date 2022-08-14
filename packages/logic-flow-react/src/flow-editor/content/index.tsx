import React, { useRef, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import LogicFlowGraph from '../components/graph/logic-flow-graph';
import appInit from '../icons/app.svg';
import LogicFlow from '@logicflow/core';
import RcResizeObserver from 'rc-resize-observer';
import { useDebounce } from '../hooks/hooks';
import SideMenu from '../menu/sider-menu';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`,
}));

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

const App: React.FC = () =>{
  const [instance, setInstance] = useState<LogicFlow>();
  const [height, setHeight] = useState<number>(600);
  const [width, setWidth] = useState<number>(1200);
  const debouncedHeight = useDebounce(setHeight, 40);
  const debouncedWidth = useDebounce(setWidth, 100);

  return (<Layout>
    <Sider width={200}>
      <RcResizeObserver onResize={({ height }) => debouncedHeight(height)}>
        <SideMenu />
      </RcResizeObserver>
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-sub-header">
        <Menu theme='light' mode="horizontal" defaultSelectedKeys={['2']} items={items1}  style={{ height: 32 }}/>
      </Header>
      <RcResizeObserver onResize={({ width }) => debouncedWidth(width)}>
        <Content style={{ padding: 0 }}>
          <LogicFlowGraph defaultGraphData={data} instance={setInstance} resize={{ height, width, heightOffset: -35 }}/>
        </Content>
      </RcResizeObserver>
    </Layout>
  </Layout>)
};

export default App;
