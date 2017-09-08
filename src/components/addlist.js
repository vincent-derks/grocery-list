import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as GroceryActions from './../actions/groceryactions'
import * as AppActions from './../actions/app'

class AddList extends Component {

    toggleAddListOpen(e){
        e.preventDefault()
        this.props.dispatch(AppActions.toggleAddList())
        this.refs.newListName.value = ''
    }

    handleAddList(event){
        event.preventDefault()
        const name = this.refs.newListName.value
        this.props.dispatch(GroceryActions.addGroceryList(name))
        this.props.dispatch(AppActions.toggleAddList())
        this.refs.newListName.value = ''
    }

    render(){
        return(
            <div className="addList">
                <button className="addListBtn" onClick={this.toggleAddListOpen.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                <div className={`formWrapper${this.props.addListOpen ? ' open' : ''}`}>
                    <form className="form-inline" action="#" onSubmit={this.handleAddList.bind(this)}>
                        <button className="closeAddList" onClick={this.toggleAddListOpen.bind(this)}><i className="fa fa-times" aria-hidden="true"></i></button>
                        <label htmlFor="newListName">Create a new list</label>
                        <input ref="newListName" type="text" name="newListName" id="newListName" className="form-control" placeholder="Name of your list" />
                        <button type="submit" className="btn btn-default" value="Create list">Create list</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        lists: state.contentReducer,
        addListOpen: state.appReducer.addListOpen
    })
)(AddList)
