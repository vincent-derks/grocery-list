import React, { Component } from 'react'
import { connect } from 'react-redux'

class ShowFoundUser extends Component {

    getShareLink(){
        let filterLists = this.props.lists.filter( item => {
            return item.id == this.props.listId
        })[0]
        if(filterLists.sharedUser){
            if( filterLists.sharedUser[this.props.user.uid] ){
                return <button className="btn btn-disabled pull-right" disabled="disabled" onClick={this.props.shareList}>Already shared</button>
            } else {
                return <button className="btn btn-default pull-right" onClick={this.props.shareList}><i className="fa fa-share" aria-hidden="true"></i> Share list</button>
            }
        } else {
            return <button className="btn btn-default pull-right" onClick={this.props.shareList}><i className="fa fa-share" aria-hidden="true"></i> Share list</button>
        }
    }

    render(){

        return(
            <div className="showUser">
                <h4>Found user</h4>
                {this.props.user.name}
                {this.getShareLink()}
                <br/><span style={{"color": "rgba(0,0,0,0.4)"}}>{this.props.user.email}</span>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        lists: state.contentReducer.groceryLists
    })
)(ShowFoundUser)
