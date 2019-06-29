import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadState } from '../localStorage'
import { confirmNotebookName, enterNotebookName } from '../actions/confirmation'
import { setView } from '../actions/app'
import { POST_NOTEBOOK } from '../config'
import { setNotebook } from '../actions/home'

var FontAwesome = require('react-fontawesome');

class Confirmation extends Component{
	componentDidMount(){
		if(!loadState().email || !loadState().token){
        	this.props.setView("login");
      	} else {
      		ReactDOM.findDOMNode(this.refs.nameInput).focus(); 
      	} 
	}
	onConfirm(){
	    fetch(POST_NOTEBOOK, {
	      method: 'POST',
	      body: JSON.stringify({"token":loadState().token, 
	        "name":this.props.store.confirmation.name})
	    })
	    .then(response => response.json())
	    .then(data => {
	      if(data.Success === true){
	      	this.props.setNotebook(data.Body.Message.Id);
	      	this.props.setView("home");
	        return false;
	      }
	      else{
	        console.log("failed to submit notebook");
	        return false;
	      }
	    })
	    .catch(err => {
	      console.log(err);
	      return undefined;
	    })
	}
	onCancell(){
		this.props.setView("home");
	}
	render(){
		var name = this.props.store.confirmation.name;
		console.log(this);
		return(
          <ReactCSSTransitionGroup transitionName="animated"
          transitionAppear={true}
          transitionLeave={true}
          transitionEnterTimeout={600}
          transitionAppearTimeout={600}
          transitionLeaveTimeout={500}>
			<div className="container-confirmation-notebook">
				<div className="icon-confirmation-notebook"><FontAwesome name=" fa fa-book"/></div>
				<div className="title-confirmation-notebook">Create Booklet</div>
				<div><input type="text" className="text-input-confirmation-notebook" placeholder="Name your new booklet" 
				onChange={(e)=>{
	        		this.props.enterNotebookName(e.target.value);
				}} ref="nameInput"/></div>
				<div className="button-panel-confirmation-notebook">
					<button disabled={name.length === 0} className={getButtonClassName(name)} onClick={(e)=>{this.onConfirm()}}>Confirm</button>
					<button className="btn-confirmation-notebook cancell" onClick={(e)=>{this.onCancell()}}>Cancell</button>	
				</div>
			</div>
			</ReactCSSTransitionGroup>
		)
	}
}

function getButtonClassName(name){
  if(name.length === 0){
    return "btn-confirmation-notebook confirm disabled";
  }
  return "btn-confirmation-notebook confirm";
}

function mapStateToProps(store, props) {
  return {store,props}
}

function mapDispatchToProps(dispatch) {
  return Object.assign({}, bindActionCreators({ setView, confirmNotebookName, enterNotebookName, setNotebook }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirmation)