import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';

import App from './App';
import Modal from './components/Modal';
import configureStore from './store';
import { SetMooring } from './store/modal';

import './index.css';
import Errors from './components/Errors';

const store = configureStore();

function Root () {
  const dispatch = useDispatch();
  const mooringRef = useRef(null);

  useEffect(() => {
    dispatch(SetMooring(mooringRef.current));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Errors />
      <App />
      <Modal />
      <div ref={mooringRef} id='modal' />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
