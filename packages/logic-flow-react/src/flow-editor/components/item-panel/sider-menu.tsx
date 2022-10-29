import React, { FC, PropsWithChildren } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

type Children = ItemType & { label: any } & { key: string };
type ItemTypeProps = ItemType & { children: Children[] };

export interface SideMenuProps extends Omit<MenuProps, 'onClick' | 'items'> {
  onClick?: (item: Children) => boolean;
  items?: ItemTypeProps[];
  instance?: string;
  defaultGraphNode?: Record<string, any>;
}

const addMouseDown = (items: ItemTypeProps[], startDrag: (item: Children) => void) => {
  items && items.forEach(i => {
    i.children && i.children.forEach(c => {
      c.label = <span style={{ userSelect: 'none'}} onMouseDown={() => startDrag(c)}>{c.label}</span>
    })
  });
  return items;
};

const SideMenu: FC<PropsWithChildren<SideMenuProps>> = ({onClick: inputOnClick, items, instance, defaultGraphNode, ...rest}) => {

  const startDrag = (item: Children) => {
    if(inputOnClick?.(item)){
      const { key } = item;
      const node = defaultGraphNode[key];
      window[instance].dnd.startDrag(node)
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
