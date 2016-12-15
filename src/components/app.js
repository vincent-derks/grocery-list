import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from './../actions'

import ListGroceries from './listgroceries'
import AddGrocery from './addgrocery'
import ChangeFilter from './changefilter'

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
                <header>
                    <h1>Epic groceries</h1>
                    <ChangeFilter />
                </header>
                <ListGroceries />
                <AddGrocery />
            </div>
        )
    }
}

export default connect(
    state => ({
        groceries: state.groceries
    })
)(App)
