import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as AuthActions from './../actions/auth'

class CreateAccount extends Component {

    handleCreateAccountFormSubmit(event){
        event.preventDefault()
        const name = this.refs.createAccountNameInput.value
        const email = this.refs.createAccountEmailInput.value
        const password = this.refs.createAccountPasswordInput.value
        this.props.dispatch(AuthActions.createUserWithEmailAndPassword(name, email, password))
    }

    render(){
        return(
            <div>
                <h3>Create an account</h3>
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
                    <button type="submit" className="btn btn-primary">Create account</button>
                </form>
            </div>
        )
    }
}

export default connect()(CreateAccount)
