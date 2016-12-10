import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import _ from 'lodash'

// Components
import App from './components/app'
// Main reducer
import rootReducer from './reducers'

// Create the main store
let store = createStore(rootReducer, window.devToolsExtension && window.devToolsExtension(), applyMiddleware(thunk))

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('app'))
