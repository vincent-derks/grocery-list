import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router';
import * as GroceryActions from './../actions/groceryactions'

import AddList from './addlist'

class ViewLists extends Component {

    removeList(key, event){
        event.preventDefault()
        this.props.dispatch(GroceryActions.removeList(key))
    }

    shareList(key, event){
        event.preventDefault()
        browserHistory.push('/share/' + key)
    }

    render(){
        if(this.props.lists.length){
            const username = this.props.dbUser ? this.props.dbUser.name : 'mysterious'
            return(
                <div>
                    <h3>Hey there {username}</h3>
                    <p>Here are your lists</p>
                    <ul className="listsDisplay">
                        {this.props.lists.map( item => {
                            return (
                                <li key={item.id}>
                                    <Link to={`/list/${item.slug}`}>{item.name}</Link>
                                    <button onClick={this.shareList.bind(this, item.id)} className="btn btn-default pull-right share"><i className="fa fa-share" aria-hidden="true"></i></button>
                                    <button onClick={this.removeList.bind(this, item.id)} className="btn btn-danger pull-right delete"><i className="fa fa-trash" aria-hidden="true"></i></button>
                                </li>
                            )
                        })}
                    </ul>
                    <AddList />
                </div>
            )
        } else if (this.props.loading) {
            return <span style={{ 'color' : 'rgba(0,0,0,0.4)'}}>Loading your lists</span>
        } else {
            return (
                <div>
                    <p style={{padding: '1rem'}}>Sorry, no lists found. Please add a new list</p>
                    <AddList />
                </div>
            )
        }
    }
}

export default connect(
    state => ({
        dbUser: state.appReducer.dbUser,
        user: state.appReducer.user,
        lists: state.contentReducer.groceryLists,
        loading: state.contentReducer.loadingLists
    })
)(ViewLists)
