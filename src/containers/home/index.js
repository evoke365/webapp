import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getNotes, submitNote, deleteNote } from '../../actions/home'
import { logout } from '../../actions/logout'
import { loadState } from '../../localStorage'
import NoteContainer from './note'
import NavContainer from './nav'
import {slide as Menu} from 'react-burger-menu';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';
import ScrollToBottom from 'react-scroll-to-bottom';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  width: 100%;
  position: absolute;
  bottom: 0;
`;
const toBottom = css`
  height: 600,
  width: 400
`;

class HomeContainer extends Component{
  state = {
    keyword: "",
    answer: "",
    loadingNote: false,
    notes: [],
  }
  componentDidMount() {
    let email = loadState("email");
    let token = loadState("token");
    if(email === undefined || token === undefined) {
      this.props.history.push("/");
      return undefined;
    }
    this.props.getNotes(token);
  }
  componentDidUpdate() {
    const { loading, notes } = this.props.store.note;
    const { loadingNote } = this.state;
    // initial loading
    if(notes.length > 0 && this.state.notes.length === 0) {
      this.setState({
        notes: notes,
      })
      return undefined
    }

    if(loading !== loadingNote) {
      // new note added, reset state
      if(loading === true) {
        this.setState({
          loadingNote : true,
          notes: notes,
        })
      } else {
        this.setState({
          keyword: "",
          answer: "",
          loadingNote: false,
        })
      }
      return undefined;
    }
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
  getNoteConatiner(note, index, loading) {
    return (
      <NoteContainer
        key={note.Id}
        note={note}
        onDeleteNote={() => this.onDeleteNote(note.Id, index)}
        loading={loading}
      />
    );
  }
  getNavContainer() {
    let email = loadState("email");
    return (
      <NavContainer 
        email={email}
        onLogout={()=>{
          this.props.logout();
          this.props.history.push("/");
        }}
      />
    )
  }
  render(){
    const { keyword, answer, notes } = this.state;
    const { loading } = this.props.store.note;
    return (
      <div>
        <Menu>
          {this.getNavContainer()}
        </Menu>
        <div className="container-a">
          {this.getNavContainer()}
        </div>
        <div className="container-b">
          <ScrollToBottom className={ toBottom }>
            <ReactCSSTransitionGroup 
              transitionName="animated"
              transitionAppear={true}
              transitionLeave={true}
              transitionEnterTimeout={200}
              transitionAppearTimeout={200}
              transitionLeaveTimeout={500}
            >
            {Array.isArray(notes) ? notes.map((note, index) => (
              this.getNoteConatiner(note, index, loading)
            )) : null}
            </ReactCSSTransitionGroup>
          </ScrollToBottom>
          <BarLoader
            css={override}
            color={'#FBA73B'}
            loading={loading}
          />
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
          <button disabled={keyword.length === 0 || answer.length === 0 || loading} tabIndex="0" className={getButtonClassName(keyword, answer)} 
          onClick={(e) => {this.onSubmitNote()}}>
            <p>add note</p>
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
  return Object.assign({}, bindActionCreators({ getNotes, submitNote, deleteNote, logout }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)