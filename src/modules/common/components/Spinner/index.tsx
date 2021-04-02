import React from 'react';
import { Spin } from 'antd';
import './spinner.scss'

const Spinner = () => {
  return (
    <div className="spinner">
      <Spin size="large" />
    </div>
  );
};

export default Spinner;