import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as GroceryActions from './../actions/groceryactions'

class AddList extends Component {

    handleAddList(event){
        event.preventDefault()
        const name = this.refs.newListName.value
        this.props.dispatch(GroceryActions.addGroceryList(name))
        this.refs.newListName.value = ''
    }

    render(){
        return(
            <form className="form-inline addList" action="#" onSubmit={this.handleAddList.bind(this)}>
                <div className="form-group">
                    <label htmlFor="newListName" className="sr-only">Create a new list</label>
                    <div className="input-group">
                        <div className="input-group-addon">Add list</div>
                        <input ref="newListName" type="text" id="newListName" className="form-control" placeholder="Name of your list" />
                        <button type="submit" className="btn btn-default" value="Create list">Create list</button>
                    </div>
                </div>
            </form>

        )
    }
}

export default connect(
    state => ({
        lists: state.contentReducer
    })
)(AddList)
