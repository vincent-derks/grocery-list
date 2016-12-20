import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as AuthActions from './../actions/auth'
import * as ContentActions from './../actions/groceryactions'

import ShowFoundUser from './showfounduser'

class ShareList extends Component {

    constructor(props){
        super(props)
        this.shareList = this.shareList.bind(this)
        this.searchUser = this.searchUser.bind(this)
    }

    searchUser(event){
        event.preventDefault()
        this.props.dispatch(AuthActions.findUser(this.refs.searchUserInput.value))
        this.refs.searchUserInput.value = ''
    }

    shareList(){
        const user = this.props.foundUser.uid,
              list = this.props.params.listId
        this.props.dispatch(AuthActions.shareList(user, list))
    }

    componentWillMount(){
        const auth = this.props.firebase.auth()
        const unsubscribe = auth.onAuthStateChanged( authData => {
            if(authData){
                this.props.dispatch(AuthActions.setUser(authData))
            }
            unsubscribe()
        })
        this.props.dispatch(ContentActions.getLists())
    }

    componentWillUnmount(){
        this.props.dispatch(AuthActions.resetUserFound())
    }

    render(){
        return(
            <div className="pageContentWrapper searchUser">
                Search a user by email address to share your list
                <form onSubmit={this.searchUser.bind(this)} className="form-inline" action="#">
                    <div className="form-group">
                        <div className="input-group">
                            <input ref="searchUserInput" type="text" className="form-control" placeholder="Email addres" />
                            <button className="btn btn-default" onClick={this.searchUser}>Search user</button>
                        </div>
                    </div>
                </form>
                {this.props.foundUser && <ShowFoundUser user={this.props.foundUser} shareList={this.shareList} listId={this.props.params.listId} />}
                {this.props.foundUser === false && <span>Sorry, no matching user found by this email, please try again</span>}
            </div>
        )
    }
}

export default connect(
    state => ({
        foundUser: state.shareReducer.foundUser,
        firebase: state.appReducer.firebase
    })
)(ShareList)
