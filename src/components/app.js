import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from './../actions'

import AddGrocery from './addgrocery'
import ChangeFilter from './changefilter'
import Header from './header'

class App extends Component {
    componentWillMount(){

        // Disable the preloader
        const preloader = document.getElementById('preloader-wrapper')
        preloader.classList = 'fadeOut'
        setTimeout(()=>{
            preloader.parentNode.removeChild(preloader)
        }, 500)

        // Load the groceries
        this.props.dispatch(Actions.loadGroceries())
    }
    render(){
        return(
            <div className="wrapper">
                <Header page={this.props.location.pathname} list={this.props.params.list} share={this.props.params.listId}/>
                {this.props.children}
            </div>
        )
    }
}

export default connect(
    state => ({
        groceries: state.groceries
    })
)(App)
