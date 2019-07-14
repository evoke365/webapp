import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getNotes, submitNote, deleteNote, getNotebooks, setNotebook } from '../../actions/home'
import { loadState, clearState } from '../../localStorage'
import { PUT_NOTE } from '../../config'
import NoteContainer from './note'
import {slide as Menu} from 'react-burger-menu';

var FontAwesome = require('react-fontawesome');

class HomeContainer extends Component{
  state = {
    keyword: "",
    answer: "",
  }
  componentDidMount() {
    let email = loadState("email");
    let token = loadState("token");
    if(typeof(email) === "undefiend" || typeof(token) === "undefined") {
      this.props.history.push("/");
      return undefined;
    }
    this.props.getNotes(token);
    this.setState({
      notes: this.props.store.note.notes
    })
  }
  componentDidUpdate() {
  }
  onImportantNote(note,index){
    // fetch(PUT_NOTE, {
    //   method: 'POST',
    //   body: JSON.stringify({"token":loadState("token"), "noteId":note.Id, "newData":{"important": (note.Important === true) ? false : true }})
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if(data.Success === true){
    //     this.props.store.home.notes[index] = data.Body.Message;
    //     this.props.updateNote(this.props.store.home.notes);
    //     return false;
    //   }
    //   else{
    //     console.log("failed to submit note");
    //     return false;
    //   }
    // })
    // .catch(err => {
    //   console.log(err);
    //   return undefined;
    // })
  }
  onDeleteNote(noteId, index){
    let token = loadState("token");
    let email = loadState("email");
    this.props.deleteNote(token, noteId);
  }
  onSubmitNote(){
    const { keyword, answer } = this.state;
    if(keyword !== "" && answer !== "") {
      this.props.submitNote(loadState("token"), keyword, answer);
    }
    /*
    var node = ReactDOM.findDOMNode(this.refs.noteList);
    node.scrollTop = node.scrollHeight;
    ReactDOM.findDOMNode(this.refs.keywordInput).focus(); 
    */
  }
  onKeySubmitNote(shifted, keyCode){
    const { keyword, answer } = this.state;
    if(keyword.length > 0 && answer.length > 0){
      if(keyCode === 13 && shifted){
        this.onSubmitNote();
      }
    }
  }
  getNoteConatiner(note, index) {
    return (
      <NoteContainer
        key={note.Id}
        note={note} 
        index={index} 
        onDeleteNote={() => this.onDeleteNote(note, index)}
      />
    );
  }
  render(){
    console.log(this.props);
    var email = loadState("email");
    var fadeout = this.props.store.home.fadeout;
    const { keyword, answer } = this.state;
    const { notes, loading } = this.props.store.note;
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
        </div>
        <div className="container-b">
          <div className="container-b-wrap" ref="noteList">
          {loading ? <div className="loading-image">Loading...</div> : ""}
          <ReactCSSTransitionGroup transitionName="animated"
          transitionAppear={true}
          transitionLeave={fadeout}
          transitionEnterTimeout={600}
          transitionAppearTimeout={600}
          transitionLeaveTimeout={500}>
          {Array.isArray(notes) ? notes.map((note, index) => (
            this.getNoteConatiner(note, index)
          )) : null}
          </ReactCSSTransitionGroup>
          </div>
        </div>
        <div className="container-c">
          <textarea onChange={(e)=>{
            this.setState({"keyword": e.target.value})
          }} 
          tabIndex="0" 
          className="question" 
          value={keyword} 
          onKeyDown={(e)=>{if(e.shiftKey && e.keyCode===13){
            e.preventDefault(); 
            this.onKeySubmitNote(e.shiftKey, e.keyCode);
            }}}  
          placeholder="keyword / question" title="Press [tab] to move to the next textbox." ref="keywordInput">
          </textarea>
          <textarea onChange={(e)=>{
            this.setState({"answer": e.target.value})
          }} 
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
  return Object.assign({}, bindActionCreators({ getNotes, submitNote, deleteNote, getNotebooks, setNotebook }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)