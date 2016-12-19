import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as AuthActions from './../actions/auth'

class LoginForm extends Component {

    handleLoginFormSubmit(event){
        event.preventDefault()
        const email = this.refs.loginEmailInput.value
        const password = this.refs.loginPasswordInput.value
        this.props.dispatch(AuthActions.signInWithEmailAndPassword(email, password))
    }

    toggleForgotPasswordEmailInput(event){
        event.preventDefault()
        this.props.dispatch(AuthActions.toggleShowForgotPasswordEmailInput())
    }

    sendForgotPasswordEmail(event){
        event.preventDefault()
        const email = this.refs.forgotPasswordEmailInput.value
        this.props.dispatch(AuthActions.sendForgotPasswordEmail(email))
    }

    render(){
        return(
            <div>
                <h3>Login</h3>
                {!this.props.forgotPasswordEmailInput &&
                    <form action="#" ref="loginForm" onSubmit={this.handleLoginFormSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input ref="loginEmailInput" type="email" className="form-control" id="inputEmail" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input ref="loginPasswordInput" type="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>&nbsp;
                        <button type="button" className="btn btn-default" onClick={this.toggleForgotPasswordEmailInput.bind(this)}>Forgot password?</button>
                    </form>
                }
                {this.props.forgotPasswordEmailInput &&
                    <form action="#" ref="loginForm" onSubmit={this.sendForgotPasswordEmail.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="forgotPasswordEmailInput">Please enter your email address</label>
                            <p>You will receive an email with instructions to reset your password</p>
                            <input ref="forgotPasswordEmailInput" type="text" className="form-control" placeholder="Enter your email address" id="forgotPasswordEmailInput" />
                        </div>
                        <button type="submit" className="btn btn-primary">Send password reset link</button>&nbsp;
                        <button type="button" className="btn btn-default" onClick={this.toggleForgotPasswordEmailInput.bind(this)}>Back to login</button>
                    </form>
                }
                {this.props.forgotPasswordEmailSend &&
                    <p>An email has been send to reset your password. Please check your mail</p>
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        forgotPasswordEmailInput: state.appReducer.forgotPasswordEmailInput,
        forgotPasswordEmailSend: state.appReducer.forgotPasswordEmailSend
    })
)(LoginForm)
