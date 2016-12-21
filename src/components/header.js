import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import * as AppActions from './../actions/app'

import ChangeFilter from './changefilter'
import Menu from './menu'

class Header extends Component {

    toggleMenu(event){
        event.preventDefault()
        this.props.dispatch(AppActions.toggleMenu())
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
            case page == '/profile':
                return 'Your profile'
            default:
                return 'Groceries'
        }
    }

    render(){
        return(
            <header>
                {!this.props.onlineStatus && <span className="offline"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Warning, there is no working internet connection available</span>}
                {this.props.list ? <Link to="/lists"><i className="fa fa-chevron-left" aria-hidden="true"></i></Link> : ''}
                {this.props.share ? <a onClick={browserHistory.goBack}><i className="fa fa-chevron-left" aria-hidden="true"></i></a> : ''}
                <h1>{this.getPageTitle()}</h1>
                {this.props.list ? <ChangeFilter /> : ''}
                {this.props.user &&
                    <a className="toggleMenu" onClick={this.toggleMenu.bind(this)}>
                        {!this.props.menuOpen && <i className="fa fa-bars" aria-hidden="true"></i>}
                        {this.props.menuOpen && <i className="fa fa-times" aria-hidden="true"></i>}
                    </a>
                }
                {this.props.user && <Menu />}
            </header>
        )
    }
}

export default connect(
    state => ({
        user: state.appReducer.user,
        menuOpen: state.appReducer.menuOpen,
        onlineStatus: state.appReducer.onlineStatus
    })
)(Header)
