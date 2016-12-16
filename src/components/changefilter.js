import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from './../actions/groceryactions'

class ChangeFilter extends Component {

    changeFilter(event){
        this.props.dispatch(Actions.changeFilter(event.target.value))
        let buttonsContainer = document.getElementsByClassName('filters')
        let buttons = buttonsContainer[0].childNodes
        buttons.forEach( button => {
            button.classList.remove('active')
        })
        event.target.classList.add('active')
    }

    isActive(button){
        return button == this.props.filter ? 'active' : ''
    }

    render(){
        return(
            <div className="filters btn-group btn-group-sm" role="group">
                <button type="button" className={'btn btn-default all '+this.isActive(undefined)} value="" onClick={this.changeFilter.bind(this)}>All</button>
                <button type="button" className={'btn btn-default open '+this.isActive('open')} value="open" onClick={this.changeFilter.bind(this)}>Open</button>
                <button type="button" className={'btn btn-default closed '+this.isActive('closed')} value="closed" onClick={this.changeFilter.bind(this)}>Closed</button>
            </div>
        )
    }
}

export default connect(
    state => ({
        filter: state.contentReducer.filter
    })
)(ChangeFilter)
