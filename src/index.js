import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

// Components
import App from './components/app'
import Login from './components/login'
import ViewLists from './components/viewlists'
import List from './components/list'
import ShareList from './components/sharelist'
import Profile from './components/profile'

// Main reducer
import rootReducer from './reducers'

// Create the main store
let store = createStore(rootReducer, window.devToolsExtension && window.devToolsExtension(), applyMiddleware(thunk))

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Login}></IndexRoute>
                <Route path="/lists" component={ViewLists}></Route>
                <Route path="/list/:list" component={List}></Route>
                <Route path="/share/:listId" component={ShareList}></Route>
                <Route path="/profile" component={Profile}></Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'))
