import React, { FC, PropsWithChildren } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import appInit from '../icons/app.svg';

export interface SideMenuProps extends Omit<MenuProps, 'onClick'> {
  onClick?: (key: string) => void;
}

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

const SideMenu: FC<PropsWithChildren<SideMenuProps>> = ({onClick: inputOnClick, ...rest}) => {

  const onClick: MenuProps['onClick'] = ({ key }) => inputOnClick?.(key);

  return <Menu
    mode="inline"
    onClick={onClick}
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    style={{ height: '100%' }}
    items={createMenuItems()}
    {...rest}
  />
};

export default SideMenu;
