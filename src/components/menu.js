import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as AuthActions from './../actions/auth'
import * as AppActions from './../actions/app'

class Menu extends Component {

    toggleMenu(event){
        this.props.dispatch(AppActions.toggleMenu())
    }

    handleLogout(){
        this.props.dispatch(AuthActions.logout())
    }

    render(){
        const menuClassNames = this.props.menuOpen ? 'open' : 'closed'
        return(
            <ul className={'menu ' + menuClassNames}>
                <li><h3>Menu</h3></li>
                <li><Link to="/lists" onClick={this.toggleMenu.bind(this)}>Your lists</Link></li>
                <li><Link to="/profile" onClick={this.toggleMenu.bind(this)}>Your profile</Link></li>
                <li><a href="#" onClick={this.handleLogout.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
            </ul>
        )
    }
}

export default connect(
    state => ({
        menuOpen: state.appReducer.menuOpen
    })
)(Menu)
