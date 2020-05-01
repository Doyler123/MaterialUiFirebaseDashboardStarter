import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { StateProvider, defaultReducer } from './state';
import routes from './constants/routes';
import constants from './constants/constants';

const initialState = {
  route: routes.HOME,
  heading: '',
  mobile: false
}

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={defaultReducer}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </StateProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
