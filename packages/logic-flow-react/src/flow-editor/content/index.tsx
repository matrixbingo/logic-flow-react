import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import LogicFlowGraph from '../components/graph/logic-flow-graph';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const App: React.FC = () => (
  <Layout>
    <Sider width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%' }}
        items={items2}
      />
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-sub-header">
        <Menu theme='light' mode="horizontal" defaultSelectedKeys={['2']} items={items1}  style={{ height: 32 }}/>
      </Header>
      <Content style={{ padding: 0, minHeight: 280 }}>
        <LogicFlowGraph />
      </Content>
    </Layout>
  </Layout>
);

export default App;
