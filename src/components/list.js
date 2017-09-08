import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import _ from 'lodash'
import * as Actions from './../actions/groceryactions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import AddGrocery from './addgrocery'

class List extends Component {

    toggleGroceryStatus(key, event){
        this.props.dispatch(Actions.toggleGroceryStatus(key))
    }

    removeGrocery(key, event){
        this.props.dispatch(Actions.removeGrocery(key))
    }

    filterGroceries(groceries){
        const { filter } = this.props
        const groceriesArray = Object.keys(groceries.list).map((key)=>{
            return {
                ...groceries.list[key],
                id: key
            }
        })
        return groceriesArray.filter( item => {
            if(filter === null){
                return true
            } else if (filter === 'open'){
                return !item.done
            } else if (filter === 'closed'){
                return item.done
            } else {
                return true
            }
        })
    }

    getPageTitle(){
        const { lists, groceries } = this.props
        if(groceries.length < 1) return undefined
        return lists.filter(list => list.id == groceries.id)[0].name
    }

    componentWillMount(){
        if(!this.props.user){
            browserHistory.push('/')
        }
        this.props.dispatch(Actions.getLists())
        this.props.dispatch(Actions.getList(this.props.params.list))
    }

    renderList(){
        const { groceries } = this.props
        if(groceries){
            if(groceries.list){
                const filteredGroceries = this.filterGroceries(groceries)
                return(
                    <ul className="groceryList">
                        <ReactCSSTransitionGroup transitionName="listItem" transitionEnterTimeout={200} transitionLeaveTimeout={200} >
                        {filteredGroceries.map((item)=>{
                            return (
                                <li key={item.id}>
                                    <input id={"check-item-"+item.id} type="checkbox" checked={item.done} onChange={this.toggleGroceryStatus.bind(this, item.id)}/>
                                    <label htmlFor={"check-item-"+item.id} className="text">{item.value} ({item.amount}x)</label>
                                    <button className="btn" onClick={this.removeGrocery.bind(this, item.id)}><i className="fa fa-times" aria-hidden="true"></i></button>
                                </li>
                            )
                        })}
                        </ReactCSSTransitionGroup>
                    </ul>
                )
            } else {
                return <ul className="groceryList"></ul>
            }

        } else {
            return <ul className="groceryList"></ul>
        }

    }

    render(){
        const pageTitle = this.getPageTitle()
        return (
            <div className="groceryListWrapper">
                <h3>{pageTitle ? pageTitle : ''}</h3>
                {this.renderList()}
                <AddGrocery />
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        groceries: state.contentReducer.singleList,
        lists: state.contentReducer.groceryLists,
        filter: state.contentReducer.filter,
        user: state.appReducer.user
    })
)(List)
