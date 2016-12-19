import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import ChangeFilter from './changefilter'
import { connect } from 'react-redux'
import * as AuthActions from './../actions/auth'

class Header extends Component {

    handleLogout(event){
        event.preventDefault()
        this.props.dispatch(AuthActions.logout())
    }

    getPageTitle(){
        const { page, list } = this.props
        switch(true){
            case page == '/lists':
                return 'Your lists'
            case page.indexOf('/list') >= 0:
                return list
            case page.indexOf('/share') >= 0:
                return 'Share your list'
            default:
                return 'Groceries'
        }
    }

    render(){
        return(
            <header>
                {this.props.list ? <Link to="/lists"><i className="fa fa-chevron-left" aria-hidden="true"></i></Link> : ''}
                {this.props.share ? <a onClick={browserHistory.goBack}><i className="fa fa-chevron-left" aria-hidden="true"></i></a> : ''}
                <h1>{this.getPageTitle()}</h1>
                {this.props.page == '/lists' && <button className="btn btn-danger pull-right" onClick={this.handleLogout.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</button>}
                {this.props.list ? <ChangeFilter /> : ''}
            </header>
        )
    }
}

export default connect()(Header)
