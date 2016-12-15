import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as Actions from './../actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class ListGroceries extends Component {

    toggleGroceryStatus(key, event){
        Actions.toggleGroceryStatus(key)
    }

    removeGrocery(key, event){
        Actions.removeGrocery(key)
    }

    render(){
        const { groceries, filter } = this.props
        if(groceries){
            const filteredGroceries = groceries.filter( item => {
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
            return(
                <ul className="groceryList">
                    <ReactCSSTransitionGroup transitionName="listItem" transitionEnterTimeout={200} transitionLeaveTimeout={200} >
                    {filteredGroceries.map((item)=>{
                        return (
                            <li key={item.id}>
                                <input type="checkbox" checked={item.done} onChange={this.toggleGroceryStatus.bind(this, item.id)}/>
                                <div className="text">{item.value} ({item.amount}x)</div>
                                <button className="btn btn-danger" onClick={this.removeGrocery.bind(this, item.id)}>Remove</button>
                            </li>
                        )
                    })}
                    </ReactCSSTransitionGroup>
                </ul>
            )
        } else {
            return <ul className="groceryList"></ul>
        }

    }
}

export default connect(
    state => ({
        groceries: state.contentReducer.groceries,
        filter: state.contentReducer.filter
    })
)(ListGroceries)
