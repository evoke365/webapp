import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getNotes, submitNote, deleteNote } from '../../actions/home'
import { loadState, clearState } from '../../localStorage'
import NoteContainer from './note'
import NavContainer from './nav'
import {slide as Menu} from 'react-burger-menu';

class HomeContainer extends Component{
  state = {
    keyword: "",
    answer: "",
    loadingNote: false,
  }
  componentDidMount() {
    let email = loadState("email");
    let token = loadState("token");
    if(email === "undefiend" || token === "undefined") {
      this.props.history.push("/");
      return undefined;
    }
    this.props.getNotes(token);
    this.setState({
      notes: this.props.store.note.notes
    })
  }
  componentDidUpdate() {
    const { loadingSubmitNote } = this.props.store.note;
    const { loadingNote } = this.state;
    if(loadingSubmitNote !== loadingNote) {
      // new note added, reset state
      if(loadingSubmitNote === false) {
        this.resetState();
        return undefined
      }
      this.setState({
        loadingNote : loadingSubmitNote,
      })
    }
  }
  resetState() {
    var node = ReactDOM.findDOMNode(this.refs.noteList);
    node.scrollTop = node.scrollHeight;
    ReactDOM.findDOMNode(this.refs.keywordInput).focus(); 

    this.setState({
      keyword: "",
      answer: "",
      loadingNote: false,
    })
  }
  onDeleteNote(noteId, index){
    let token = loadState("token");
    this.props.deleteNote(token, noteId, index);
  }
  onSubmitNote(){
    const { keyword, answer } = this.state;
    if(keyword !== "" && answer !== "") {
      this.props.submitNote(loadState("token"), keyword, answer);
    }
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
        onDeleteNote={() => this.onDeleteNote(note.Id, index)}
      />
    );
  }
  getNavContainer(email) {
    return (
      <NavContainer 
        email={email}
        onLogout={()=>{
          clearState();
          this.props.history.push("/");
        }}
      />
    )
  }
  render(){
    var email = loadState("email");
    const { keyword, answer } = this.state;
    const { notes, loadingGetNote } = this.props.store.note;
    return (
      <div>
        <Menu>
          {this.getNavContainer(email)}
        </Menu>
        <div className="container-a">
          {this.getNavContainer(email)}
        </div>
        <div className="container-b">
          <div className="container-b-wrap" ref="noteList">
          {loadingGetNote ? <div className="loading-image">Loading...</div> : ""}
          <ReactCSSTransitionGroup 
            transitionName="animated"
            transitionAppear={true}
            transitionLeave={true}
            transitionEnterTimeout={600}
            transitionAppearTimeout={600}
            transitionLeaveTimeout={500}
          >
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
  return Object.assign({}, bindActionCreators({ getNotes, submitNote, deleteNote }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)