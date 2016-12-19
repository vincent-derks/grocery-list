import React, { Component } from 'react'
import * as AuthActions from './../actions/auth'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import CreateAccount from './createaccount'
import LoginForm from './loginform'

class Login extends Component {

    componentDidUpdate(){
        if(this.props.user){
            browserHistory.push('/lists')
        }
    }

    componentWillMount(){
        const auth = this.props.firebase.auth()
        const unsubscribe = auth.onAuthStateChanged( authData => {
            if(authData){
                this.props.dispatch(AuthActions.setUser(authData))
            }
            unsubscribe()
        })
    }

    toggleCreateAccount(event){
        event.preventDefault()
        this.props.dispatch(AuthActions.toggleCreateAccount())
    }

    render(){
        if(!this.props.user){
            if(!this.props.showCreateAccount){
                return (
                        <div className="pageContentWrapper">
                            <LoginForm />
                            <h3>Don't have an account?</h3>
                            <button className="btn btn-success" onClick={this.toggleCreateAccount.bind(this)}>Create an account</button>
                        </div>
                )
            } else {
                return (
                    <div className="pageContentWrapper">
                        <CreateAccount />
                        <h3>Already have an account?</h3>
                        <button className="btn btn-default" onClick={this.toggleCreateAccount.bind(this)}>Go back to login page</button>
                    </div>
                )
            }
        } else {
            return (
                <div>Redirect to lists</div>
            )
        }
    }
}

export default connect(
    state => ({
        user: state.appReducer.user,
        firebase: state.appReducer.firebase,
        showCreateAccount: state.appReducer.showCreateAccount
    })
)(Login)
