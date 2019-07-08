import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getNotes, submitNote, enterKeyword, enterAnswer, getNotebooks, setNotebook } from '../../actions/home'
import { loadState, clearState } from '../../localStorage'
import { GET_NOTEBOOKS, GET_NOTES, POST_NOTE, PUT_NOTE } from '../../config'
import {slide as Menu} from 'react-burger-menu';

var FontAwesome = require('react-fontawesome');

class HomeContainer extends Component{
  componentDidMount() {
    let email = loadState("email");
    let token = loadState("token");
    if(typeof(email) === "undefiend" || typeof(token) === "undefined") {
      this.props.history.push("/");
      return undefined;
    }
    // TODO: Should we combine multiple requests into one?
    fetch(GET_NOTEBOOKS+"/"+token)
    .then(response => response.json())
    .then(data => {
      if(data.Success === true){
      this.props.getNotebooks(data.Body.Message)
      // Set notebook to the default one for now
      // TODO: make dynamic notebook selection
      if(this.props.store.home.notebookId === 0){
          var defaultNotebook = this.props.store.home.notebooks[0];
          this.props.setNotebook(defaultNotebook.Id)
      }
      fetch(GET_NOTES+"/"+token+"/"+this.props.store.home.notebookId)
      .then(response => response.json())
      .then(data => {
        if(data.Success === true){
          if(data.Body.Message !== null) {
              this.props.getNotes(data.Body.Message);
          }
          else {
            this.props.getNotes([]);
          }
        }
        else{
          console.log("Failed to fetch notebooks data or data is null");
        }
      })
      .catch(err => {
        console.log(err);
        return undefined;
      })
      }
      else{
      console.log("Failed to fetch notebooks data");
      }
    })
    .catch(err => {
        console.log(err);
        return undefined;
    })
  }
  onImportantNote(note,index){
    fetch(PUT_NOTE, {
      method: 'POST',
      body: JSON.stringify({"token":loadState("token"), "noteId":note.Id, "newData":{"important": (note.Important === true) ? false : true }})
    })
    .then(response => response.json())
    .then(data => {
      if(data.Success === true){
        this.props.store.home.notes[index] = data.Body.Message;
        this.props.updateNote(this.props.store.home.notes);
        return false;
      }
      else{
        console.log("failed to submit note");
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return undefined;
    })
  }
  onDeleteNote(note,index){
    fetch(PUT_NOTE, {
      method: 'POST',
      body: JSON.stringify({"token":loadState().token, "noteId":note.Id, "newData":{"deleted": true }})
    })
    .then(response => response.json())
    .then(data => {
      if(data.Success === true){
        this.props.store.home.notes.splice(index, 1);
        this.props.updateNote(this.props.store.home.notes);
        return false;
      }
      else{
        console.log("failed to submit note");
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return undefined;
    })
  }
  onSubmitNote(){
    fetch(POST_NOTE, {
      method: 'POST',
      body: JSON.stringify({"token":loadState().token, 
        "notebookId":this.props.store.home.notebookId, 
        "keyword":this.props.store.home.keyword, 
        "answer":this.props.store.home.answer})
    })
    .then(response => response.json())
    .then(data => {
      if(data.Success === true){
        this.props.store.home.notes.push(data.Body.Message);
        this.props.submitNote(this.props.store.home.notes);
        var node = ReactDOM.findDOMNode(this.refs.noteList);
        node.scrollTop = node.scrollHeight;
        ReactDOM.findDOMNode(this.refs.keywordInput).focus(); 
        return false;
      }
      else{
        console.log("failed to submit note");
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return undefined;
    })
  }
  onKeySubmitNote(shifted, keyCode){
    if(this.props.store.home.keyword.length > 0 && 
      this.props.store.home.answer.length > 0){
      if(keyCode === 13 && shifted){
        this.onSubmitNote();
      }
    }
  }
  onSelectNotebook(notebook, index){
    this.props.setNotebook(notebook.Id);
    fetch(GET_NOTES+"/"+loadState().token+"/"+notebook.Id)
    .then(response => response.json())
    .then(data => {
      if(data.Success === true){
        if(data.Body.Message !== null) {
          this.props.getNotes(data.Body.Message);
        }
        else {
          this.props.getNotes([]);
        }
      }
      else{
        console.log("Failed to fetch notebooks data or data is null");
      }
    })
    .catch(err => {
      console.log(err);
      return undefined;
    })
  }
  onAddNotebook(){
    //this.props.setView("confirmation-add-notebook");
  }
  onMoveNote(notebook, note, index){
    fetch(PUT_NOTE, {
      method: 'POST',
      body: JSON.stringify({"token":loadState().token, "noteId":note.Id, "newData":{"notebookId": notebook.Id }})
    })
    .then(response => response.json())
    .then(data => {
      if(data.Success === true){
        this.props.store.home.notes.splice(index, 1);
        this.props.updateNote(this.props.store.home.notes);
        return false;
      }
      else{
        console.log("failed to submit note");
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return undefined;
    })
  }
  render(){
    var email = loadState("email");
    var keyword = this.props.store.home.keyword;
    var answer = this.props.store.home.answer;
    var notebookId = this.props.store.home.notebookId;
    var notes = this.props.store.home.notes;
    var loaded = this.props.store.home.loaded;
    var notebooks = this.props.store.home.notebooks;
    var fadeout = this.props.store.home.fadeout;

    return (
      <div>
        <Menu>
          <p className="text-title" >studybox.io</p>
          <div className="home-left-top">
            <p className="a-text"><FontAwesome name="user-circle"/> {email}</p>
            <button tabIndex="-1" className="_button btn-logout"  
            onClick={(e)=>{
              clearState();
              this.props.history.push("/");
            }}>&nbsp;<FontAwesome name="sign-out"/> </button>
          </div>
          <div className="container-booklets">
            <div className="booklet-title">
              <FontAwesome name="book"/> My booklet 
              <button tabIndex="-1" className="btn-booklet-add" onClick={(e)=>{this.onAddNotebook()}}><FontAwesome name="plus"/></button>
            </div>

          {Array.isArray(notebooks) ? notebooks.map((notebook, index) => {
            return(
              <div className={getNotebookClassName(notebookId, notebook.Id)} key={notebook.Id}>
                <FontAwesome name="sticky-note-o"/> <button tabIndex="-1" className="home-booklets-booklet" onClick={(e) => {this.onSelectNotebook(notebook, index)}}>{notebook.Name}</button>
              </div>
            )
          }) : null}
          </div>
        </Menu>
        <div className="container-a">
          <p className="text-title" >studybox.io</p>
          <div className="home-left-top">
            <p className="a-text"><FontAwesome name="user-circle"/> {email}</p>
            <button tabIndex="-1" className="_button btn-logout"  
            onClick={(e)=>{
              clearState();
              this.props.history.push("/login");
            }}>&nbsp;<FontAwesome name="sign-out"/> </button>
          </div>
          <div className="container-booklets">
            <div className="booklet-title">
              <FontAwesome name="book"/> My booklet 
              <button tabIndex="-1" className="btn-booklet-add" onClick={(e)=>{this.onAddNotebook()}}><FontAwesome name="plus"/></button>
            </div>

          {Array.isArray(notebooks) ? notebooks.map((notebook, index) => {
            return(
              <div className={getNotebookClassName(notebookId, notebook.Id)} key={notebook.Id}>
                <FontAwesome name="sticky-note-o"/> <button tabIndex="-1" className="home-booklets-booklet" onClick={(e) => {this.onSelectNotebook(notebook, index)}}>{notebook.Name}</button>
              </div>
            )
          }) : null}
          </div>
        </div>
        <div className="container-b">
          <div className="container-b-wrap" ref="noteList">
          {loaded ? "" : <div className="loading-image">Loading...</div>}
          <ReactCSSTransitionGroup transitionName="animated"
          transitionAppear={true}
          transitionLeave={fadeout}
          transitionEnterTimeout={600}
          transitionAppearTimeout={600}
          transitionLeaveTimeout={500}>
          {Array.isArray(notes) ? notes.map((note, index) => {
            return (
            <div key={note.Id}>
            <div className="container-nw">
              <div className="container-text">
                <p className="text-keyword">{note.Keyword}</p>
                <p className="text-main-points">{note.Answer}</p>
              </div>
              <div className="container-switch">
                <div className="btn-panel-note">
                    <button 
                    title="Beat the forgetting curve! When turned, this note is scheduled for revised."
                    tabIndex="-1" 
                    className={note.Important ? '_button btn-panel-button calendar-check' : '_button btn-panel-button calendar-uncheck'} onClick={(e)=>{this.onImportantNote(note,index)}}><FontAwesome name="calendar-check-o"/></button>
                </div>
              </div>
              <div className="btn-panel-hidden">
                    <div className="dropdown">
                      <button tabIndex="-1" className="_button btn-panel-button notebook-btn"><FontAwesome name="book"/></button>
                      <div className={(index === 0 || index === 1) ? 'dropdown-content slidedown' : 'dropdown-content slideup'}>
                      {Array.isArray(notebooks) ? notebooks.map((nb, i) => {
                        if(nb.Id === note.NotebookId) {
                          return(
                            <div key={nb.Id} className="notebook-current">{nb.Name}</div>
                          )
                        } else {
                          return(
                            <a key={nb.Id} onClick={(e)=>this.onMoveNote(nb, note, index)}>{nb.Name}</a>
                          )
                        }
                      }) : null}
                    </div>
                </div>
                <button tabIndex="-1" className="_button btn-panel-button" onClick={(e)=>{this.onDeleteNote(note,index)}}><FontAwesome name="trash-o"/></button>
              </div>
            </div>
            <hr/></div>)
          }) : null}
          </ReactCSSTransitionGroup>
          </div>
        </div>
        <div className="container-c">
          <textarea onChange={(e)=>{this.props.enterKeyword(e.target.value)}} 
          tabIndex="0" 
          className="question" 
          value={keyword} 
          onKeyDown={(e)=>{if(e.shiftKey && e.keyCode===13){
            e.preventDefault(); 
            this.onKeySubmitNote(e.shiftKey, e.keyCode);
            }}}  
          placeholder="keyword / question" title="Press [tab] to move to the next textbox." ref="keywordInput">
          </textarea>
          <textarea onChange={(e)=>{this.props.enterAnswer(e.target.value)}} 
          tabIndex="0" 
          className="answer" 
          value={answer} 
          onKeyDown={(e)=>{if(e.shiftKey && e.keyCode===13){
            e.preventDefault();
            this.onKeySubmitNote(e.shiftKey, e.keyCode);
          }}} 
          placeholder="main points / answer" title="Press [tab] to move to the 'add note' button.">
          </textarea>
          <button disabled={keyword.length === 0 || answer.length === 0} tabIndex="0" className={getButtonClassName(keyword, answer)} 
          onClick={(e) => {this.onSubmitNote()}}>
            <p>add note</p>
            {/* <p className="hotkey-add-note">[shift + enter]</p> */}
          </button>
        </div>
      </div>
    )
  }
}

function getNotebookClassName(selected, index){
  if(selected === index){
    return "home-booklets home-booklets-selected";
  }
  return "home-booklets";
}

function getButtonClassName(keyword, answer){
  if(keyword.length === 0 || answer.length === 0){
    return "addnote_disabled";
  }
  return "addnote";
}

function mapStateToProps(store, props) {
  return {store,props}
}

function mapDispatchToProps(dispatch) {
  return Object.assign({}, bindActionCreators({ getNotes, submitNote, enterKeyword, enterAnswer, getNotebooks, setNotebook }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)