import React, { FC, PropsWithChildren } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import appInit from '../../icons/app.svg';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

type Children = ItemType & { label: any } & { key: string };
type ItemTypeProps = ItemType & { children: Children[] };

export interface SideMenuProps extends Omit<MenuProps, 'onClick' | 'items'> {
  onClick?: (item: Children) => boolean;
  items?: ItemTypeProps[];
  instance?: string;
}

const addMouseDown = (items: ItemTypeProps[], startDrag: (item: Children) => void) => {
  items && items.forEach(i => {
    i.children && i.children.forEach(c => {
      c.label = <span style={{ userSelect: 'none'}} onMouseDown={() => startDrag(c)}>{c.label}</span>
    })
  });
  return items;
};

const SideMenu: FC<PropsWithChildren<SideMenuProps>> = ({onClick: inputOnClick, items, instance, ...rest}) => {

  const startDrag = (item: Children) => {
    if(inputOnClick?.(item)){
      window[instance].dnd.startDrag({
        type: 'rect-node',
        properties: {
          name: '6',
          status: 'init',
          svgs: { init: appInit }
        },
      })
    }
  }

  return <Menu
    mode="inline"
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    style={{ height: '100%' }}
    items={addMouseDown(items, startDrag)}
    // onMouseDown={startDrag}
    {...rest}
  />
};

SideMenu.defaultProps =  {
  onClick: (item: Children) => true
}

export default SideMenu;
