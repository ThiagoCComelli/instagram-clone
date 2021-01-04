import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import { createStore } from 'redux'
import allReducer from './reducers'
import { Provider } from 'react-redux'

const myStore = createStore(allReducer)

ReactDOM.render(
    <Provider store={myStore}>
        <App />
    </Provider>
    ,document.getElementById('root')
);