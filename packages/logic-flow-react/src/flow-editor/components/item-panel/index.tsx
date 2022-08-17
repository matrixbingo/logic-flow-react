import React, {  } from 'react';
import { Layout } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import SideMenu from './sider-menu';

const { Sider } = Layout;

export default function index({ onResize, ...rest }) {
  return (
    <Sider width={200}>
      <RcResizeObserver onResize={onResize}>
        <SideMenu {...rest} />
      </RcResizeObserver>
    </Sider>
  )
}


