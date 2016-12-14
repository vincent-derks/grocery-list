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
        const { groceries } = this.props
        if(groceries){
            return(
                <ul className="groceryList">
                    <ReactCSSTransitionGroup transitionName="listItem" transitionEnterTimeout={200} transitionLeaveTimeout={200} >
                    {Object.keys(groceries).map((key, index)=>{
                        const item = groceries[key]
                        return (
                            <li key={key}>
                                <input type="checkbox" checked={item.done} onChange={this.toggleGroceryStatus.bind(this, key)}/>
                                <div className="text">{item.value} ({item.amount}x)</div>
                                <button className="btn btn-danger" onClick={this.removeGrocery.bind(this, key)}>Remove</button>
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
        groceries: state.contentReducer.groceries
    })
)(ListGroceries)
