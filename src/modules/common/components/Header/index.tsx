import { Button } from 'antd';
import { SearchOutlined, CloseOutlined, LeftOutlined } from '@ant-design/icons';
import React from 'react';
import './header.scss'

export interface IHeader {
  isSearchVisible: boolean
  onSearch: (isVisible: boolean) => void
  isBackButtonVisible: boolean
  onBack: () => void
}
const Header: React.FC<IHeader> = ({ isSearchVisible, onSearch, isBackButtonVisible, onBack }) => {
  const renderButtonIcon = () => {
    return isSearchVisible ? (<CloseOutlined />) : (<SearchOutlined />)
  }
  return (
    <header className="header">
      <Button type="primary" style={{ visibility: isBackButtonVisible ? 'visible' : 'hidden' }} onClick={onBack} shape="circle" icon={<LeftOutlined />} />
      <h1> OMDB </h1>
      <Button type="primary" onClick={() => onSearch(!isSearchVisible)} shape="circle" icon={renderButtonIcon()} />
    </header>
  );
};

export default Header;