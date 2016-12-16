import React, { Component } from 'react'
import * as AuthActions from './../actions/auth'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

class Login extends Component {

    handleLoginFormSubmit(event){
        event.preventDefault()
        const email = this.refs.loginEmailInput.value
        const password = this.refs.loginPasswordInput.value
        this.props.dispatch(AuthActions.signInWithEmailAndPassword(email, password))
    }

    handleCreateAccountFormSubmit(event){
        event.preventDefault()
        const name = this.refs.createAccountNameInput.value
        const email = this.refs.createAccountEmailInput.value
        const password = this.refs.createAccountPasswordInput.value
        this.props.dispatch(AuthActions.createUserWithEmailAndPassword(name, email, password))
    }

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

    render(){
        if(!this.props.user){
            return(
                <div className="pageContentWrapper">
                    <h3>Login</h3>
                    <form action="#" ref="loginForm" onSubmit={this.handleLoginFormSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input ref="loginEmailInput" type="email" className="form-control" id="inputEmail" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input ref="loginPasswordInput" type="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-default">Login</button>
                    </form>
                    <h3>Or create an account</h3>
                    <form action="#" ref="createAccountForm" onSubmit={this.handleCreateAccountFormSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="inputName">Your name</label>
                            <input ref="createAccountNameInput" type="text" className="form-control" id="inputName" placeholder="Your name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input ref="createAccountEmailInput" type="email" className="form-control" id="inputEmail" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input ref="createAccountPasswordInput" type="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-default">Create account</button>
                    </form>
                </div>
            )
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
        firebase: state.appReducer.firebase
    })
)(Login)
