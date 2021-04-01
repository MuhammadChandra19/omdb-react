import * as React from 'react'
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import MainLayout from './modules/common/MainLayout';
import { AppStore } from './utils/redux/store';
import './modules/common/styles/index.scss'

ReactDOM.render(
  <Provider store={AppStore}>
    <MainLayout />
  </Provider>,
  document.getElementById("root")
)
