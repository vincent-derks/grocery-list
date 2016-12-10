import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as Actions from './../actions'

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
                    {Object.keys(this.props.groceries).map((key, index)=>{
                        const item = this.props.groceries[key]
                        return (
                            <li key={_.uniqueId()}>
                                <input type="checkbox" checked={item.done} onChange={this.toggleGroceryStatus.bind(this, key)}/>
                                <div className="text">{item.value} ({item.amount}x)</div>
                                <button className="btn btn-danger" onClick={this.removeGrocery.bind(this, key)}>Remove</button>
                            </li>
                        )
                    })}

                </ul>
            )
        } else {
            return <div></div>
        }

    }
}

export default connect(
    state => ({
        groceries: state.contentReducer.groceries
    })
)(ListGroceries)
