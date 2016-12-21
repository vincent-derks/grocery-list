import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as GroceryActions from './../actions/groceryactions'
import * as AuthActions from './../actions/auth'
import * as AppActions from './../actions/app'

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

        if(!this.props.user){
            browserHistory.push('/')
        }
        this.props.firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                this.props.dispatch(GroceryActions.getLists())
            }
            this.props.dispatch(AuthActions.setUser(firebaseUser))
        })

        let connected = this.props.firebase.database().ref('.info/connected')
        connected.on('value', snap => {
            this.props.dispatch(AppActions.toggleOnlineStatus(snap.val()))    
        })

    }
    render(){
        if(this.props.user === undefined){
            return (
                <div className="wrapper">
                    <Header page={this.props.location.pathname} list={this.props.params.list} share={this.props.params.listId}/>
                    <span style={{ 'color' : 'rgba(0,0,0,0.4)'}}>Loading user data...</span>
                </div>
            )
        } else {
            return (
                <div className="wrapper">
                    <Header page={this.props.location.pathname} list={this.props.params.list} share={this.props.params.listId}/>
                    {this.props.children}
                </div>
            )
        }
    }
}

export default connect(
    state => ({
        firebase: state.appReducer.firebase,
        user: state.appReducer.user
    })
)(App)
