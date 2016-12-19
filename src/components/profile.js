import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as AuthActions from './../actions/auth'

class Profile extends Component {

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
        return(
            <div>Profile page</div>
        )
    }
}

export default connect(
    state => ({
        firebase: state.appReducer.firebase
    })
)(Profile)
