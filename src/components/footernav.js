import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

@connect(state => {
    return {

    }
})

export default class FooterNav extends Component {

    render(){
        return (
            <footer>
                <Link to="/lists" className="viewLists"><i className="fa fa-list" aria-hidden="true"></i></Link>
                <Link to="/profile" className="viewProfile"><i className="fa fa-user" aria-hidden="true"></i></Link>
            </footer>
        )
    }

}