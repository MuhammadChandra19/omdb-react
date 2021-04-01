import * as React from 'react'
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { AppStore } from './utils/redux/store';

ReactDOM.render(
  <Provider store={AppStore}>
    <h1>Hallo world</h1>
  </Provider>,
  document.getElementById("root")
)
