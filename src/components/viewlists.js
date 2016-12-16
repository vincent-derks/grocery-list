import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router';
import * as GroceryActions from './../actions/groceryactions'

import AddList from './addlist'

class ViewLists extends Component {
    componentWillMount(){
        if(!this.props.user){
            browserHistory.push('/')
        }
        this.props.dispatch(GroceryActions.getLists())
    }

    removeList(key, event){
        event.preventDefault()
        this.props.dispatch(GroceryActions.removeList(key))
    }

    shareList(key, event){
        event.preventDefault()
        browserHistory.push('/share/' + key)
    }

    render(){
        if(this.props.lists){
            return(
                <div>
                    <ul className="listsDisplay">
                        {this.props.lists.map( item => {
                            return (
                                <li key={item.id}>
                                    <Link to={`/list/${item.slug}`}>{item.name}</Link>
                                    <button onClick={this.shareList.bind(this, item.id)} className="btn btn-default pull-right"><i className="fa fa-share" aria-hidden="true"></i></button>
                                    <button onClick={this.removeList.bind(this, item.id)} className="btn btn-danger pull-right"><i className="fa fa-trash" aria-hidden="true"></i></button>
                                </li>
                            )
                        })}
                    </ul>
                    <AddList />
                </div>
            )
        } else {
            return ''
        }
    }
}

export default connect(
    state => ({
        user: state.appReducer.user,
        lists: state.contentReducer.groceryLists
    })
)(ViewLists)
