import React, { FC, PropsWithChildren } from 'react';

export interface MenuProps {
  value?: string;
  onChange?: (value: string) => void;
}

const Menu: FC<PropsWithChildren<MenuProps>> = ({value, onChange, ...rest}) => {
  return <></>
};

export default Menu;
