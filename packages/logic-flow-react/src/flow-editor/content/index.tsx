import React, { FC, PropsWithChildren, useState } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import LogicFlowGraph, { LogicFlowGraphProps } from '../components/graph/logic-flow-graph';
import appInit from '../icons/app.svg';
import LogicFlow from '@logicflow/core';
import RcResizeObserver from 'rc-resize-observer';
import { useDebounce } from '../hooks/hooks';
import { SideMenuProps } from '../components/item-panel/sider-menu';
import ItemPanel from '../components/item-panel';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`,
}));

interface FlowEdtorProps {
  itemPanel: SideMenuProps;
  logicFlowGraph: LogicFlowGraphProps;
}

const FlowEdtor: FC<PropsWithChildren<FlowEdtorProps>> = (props) =>{
  const { itemPanel, logicFlowGraph, children } = props;
  const [instance, setInstance] = useState<LogicFlow>();
  const [height, setHeight] = useState<number>(600);
  const [width, setWidth] = useState<number>(1200);
  const debouncedHeight = useDebounce(setHeight, 40);
  const debouncedWidth = useDebounce(setWidth, 100);

  return (<Layout>
    <ItemPanel onResize={({ height }) => debouncedHeight(height)} {...itemPanel} />
    <Layout className="site-layout">
      <Header className="site-layout-sub-header">
        <Menu theme='light' mode="horizontal" defaultSelectedKeys={['2']} items={items1}  style={{ height: 32 }}/>
      </Header>
      <Layout>
      <RcResizeObserver onResize={({ width }) => debouncedWidth(width)}>
        <Content style={{ padding: 0 }}>
          <LogicFlowGraph instance={setInstance} resize={{ height, width, heightOffset: -35 }} {...logicFlowGraph}/>
        </Content>
      </RcResizeObserver>
      <Sider theme='light' width={300} >{children as any}</Sider>
      </Layout>
    </Layout>
  </Layout>)
};

export default FlowEdtor;
