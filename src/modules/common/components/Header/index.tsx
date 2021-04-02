import { Button } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import React from 'react';
import './header.scss'

export interface IHeader {
  isSearchVisible: boolean
  onSearch: (isVisible: boolean) => void
}
const Header: React.FC<IHeader> = ({ isSearchVisible, onSearch }) => {
  const renderButtonIcon = () => {
    return isSearchVisible ? (<CloseOutlined />) : (<SearchOutlined />)
  }
  return (
    <header className="header">
      <h1> OMDB </h1>
      <Button type="primary" onClick={() => onSearch(!isSearchVisible)} shape="circle" icon={renderButtonIcon()} />
    </header>
  );
};

export default Header;