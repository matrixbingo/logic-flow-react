import React, { FC, PropsWithChildren } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import appInit from '../icons/app.svg';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

export interface SideMenuProps extends Omit<MenuProps, 'onClick' | 'items'> {
  onClick?: (key: string) => void;
  items?: ItemType[];
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


const SideMenu: FC<PropsWithChildren<SideMenuProps>> = ({onClick: inputOnClick, items, ...rest}) => {

  const onClick: MenuProps['onClick'] = ({ key }) => inputOnClick?.(key);

  return <Menu
    mode="inline"
    onClick={onClick}
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    style={{ height: '100%' }}
    items={items}
    {...rest}
  />
};

export default SideMenu;
