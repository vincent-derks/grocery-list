import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import ChangeFilter from './changefilter'

export default class Header extends Component {

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
                {this.props.list ? <ChangeFilter /> : ''}
            </header>
        )
    }
}
