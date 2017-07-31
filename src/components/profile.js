import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as AuthActions from './../actions/auth'

class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: props.dbUser.name
        }

        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleProfileUpdate = this.handleProfileUpdate.bind(this)

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

    handleChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    handleProfileUpdate(e){
        e.preventDefault()
        const userData = {
            name: this.state.name
        }
        this.props.dispatch(AuthActions.updateProfile(userData))
    }

    render(){
        return(
            <div className="profile">
                <form ref="profileForm" className="form" onSubmit={this.handleProfileUpdate}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" className="form-control" type="text" value={this.state.name} onChange={this.handleChangeName} />                    
                    </div>
                    <button className="btn btn-primary" type="submit">Save</button>
                </form>
            </div>
        )
    }
}

export default connect(
    state => ({
        firebase: state.appReducer.firebase,
        user: state.appReducer.user,
        dbUser: state.appReducer.dbUser
    })
)(Profile)
