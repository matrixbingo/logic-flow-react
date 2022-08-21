import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Button, Drawer, DrawerProps, Layout, Menu } from 'antd';
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
import Control from '../components/control';
import { useCreation } from '../hooks';
import { assertError } from '../util/util';

const { Content } = Layout;

interface FlowEditorProps {
  itemPanel: SideMenuProps;
  logicFlowGraph: LogicFlowGraphProps;
  drawerProps: Omit<DrawerProps, 'placement' | 'getContainer'>;
  controlKeys?: string[];
  defaultSize?: { height: number, width: number };
  children?: React.ReactNode;
}

function assertstion(props: FlowEditorProps): asserts props is FlowEditorProps & Required<Omit<FlowEditorProps, 'children' | 'controlKeys'>> {
  assertError(props, ['defaultSize', 'children']);
}

const FlowEditor: FC<PropsWithChildren<FlowEditorProps>> = (props) => {
  assertstion(props);
  const { itemPanel, logicFlowGraph, controlKeys, drawerProps, defaultSize, children } = props;
  const { height: defaultHeight, width: defaultWidth } = defaultSize;
  const [height, setHeight] = useState<number>(defaultHeight);
  const [width, setWidth] = useState<number>(defaultWidth);
  const debouncedHeight = useDebounce(setHeight, 40);
  const debouncedWidth = useDebounce(setWidth, 100);
  window.console.log('debouncedHeight, debouncedWidth---------------->', height, width);
  const { instance =  'lf' } = logicFlowGraph;
  const container = useRef();

  return (
    <div id="logic-flow-graph-layout" ref={container} style={{ position: "relative"}}>
      <Layout>
        <ItemPanel onResize={({ height }) => debouncedHeight(height)} instance={instance} {...itemPanel} />
        <Layout className="site-layout">
          <Layout>
            <RcResizeObserver onResize={({ width }) => debouncedWidth(width)}>
              <Content style={{ padding: 0, position: 'relative' }}>
                <Control instance={instance} showKeys={controlKeys} />
                <LogicFlowGraph instance={instance} resize={{ height, width, heightOffset: 1 }} {...logicFlowGraph}/>
              </Content>
            </RcResizeObserver>
          </Layout>
        </Layout>
      </Layout>
      <Drawer placement="right" getContainer={container.current} style={{ position: "absolute" }} {...drawerProps}>
        {children as any}
      </Drawer>
    </div>
  )
};

FlowEditor.defaultProps = {
  defaultSize: { height: 800, width: 1200 }
}

export default FlowEditor;
