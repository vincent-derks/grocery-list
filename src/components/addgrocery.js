import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from './../actions'

class AddGrocery extends Component {

    submitGrocery(event){
        event.preventDefault()
        const value = this.refs.groceryInput.value
        const amount = this.refs.groceryNumberInput.value
        Actions.addGrocery(value, amount)
        this.refs.groceryInput.value = ''
    }

    render(){
        return(
            <form className="addGrocery" onSubmit={this.submitGrocery.bind(this)}>
                <input className="form-control" ref="groceryInput" type="text" placeholder="Add new grocery"/>
                <input className="form-control" ref="groceryNumberInput" type="number" defaultValue="1" />
                <button type="submit" className="btn btn-default" value="Add">Add</button>
            </form>
        )
    }
}

export default connect()(AddGrocery)
