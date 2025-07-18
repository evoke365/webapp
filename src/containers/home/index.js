import React, { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { 
  useGetNotesQuery, 
  useSubmitNoteMutation, 
  useDeleteNoteMutation, 
  useMarkNoteMutation 
} from '../../store/api'
import { loadState } from '../../localStorage'
import NoteContainer from './note'
import NavContainer from './nav'
import { css } from '@emotion/react';
import BarLoader from 'react-spinners/BarLoader';
import ScrollToBottom from 'react-scroll-to-bottom';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
`;

const HomeContainer = () => {
  const [keyword, setKeyword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get token for API calls
  const token = loadState("token");
  const email = loadState("email");
  
  // RTK Query hooks
  const { data: notes = [], isLoading } = useGetNotesQuery(token);
  const [submitNote, { isLoading: isSubmitting }] = useSubmitNoteMutation();
  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();
  const [markNote, { isLoading: isMarking }] = useMarkNoteMutation();

  useEffect(() => {
    if (!email || !token) {
      navigate("/");
    }
  }, [email, token, navigate]);

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote({ token, noteId }).unwrap();
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleSubmitNote = async () => {
    if (keyword !== "" && answer !== "") {
      try {
        await submitNote({ token, title: keyword, body: answer }).unwrap();
        setKeyword("");
        setAnswer("");
      } catch (error) {
        console.error('Failed to submit note:', error);
      }
    }
  };

  const handleKeySubmitNote = (event) => {
    if (keyword.length > 0 && answer.length > 0) {
      if (event.key === 'Enter' && event.shiftKey) {
        event.preventDefault();
        handleSubmitNote();
      }
    }
  };

  const handleMarkImportant = async (noteId, isImportant) => {
    try {
      await markNote({ noteId, token, important: isImportant }).unwrap();
    } catch (error) {
      console.error('Failed to mark note:', error);
    }
  };

  const getNoteContainer = (note, index) => {
    return (
      <NoteContainer
        key={note.Id}
        note={note}
        onDeleteNote={() => handleDeleteNote(note.Id)}
        onMarkImportant={() => handleMarkImportant(note.Id, !note.Important)}
        loading={isDeleting || isMarking}
      />
    );
  };

  const getNavContainer = () => {
    return (
      <NavContainer
        onLogout={() => {
          dispatch({ type: 'USER_LOGOUT' });
          navigate("/");
        }}
      />
    );
  };

  return (
    <div>
      <div className="container-a">
        {getNavContainer()}
      </div>
      <div className="container-b">
        <ScrollToBottom className="toBottom">
          <TransitionGroup>
            {Array.isArray(notes) ? notes.map((note, index) => (
              <CSSTransition
                key={note.Id}
                timeout={200}
                classNames="animated"
                appear={true}
              >
                {getNoteContainer(note, index)}
              </CSSTransition>
            )) : null}
          </TransitionGroup>
        </ScrollToBottom>
        <BarLoader
          css={override}
          color={'#FBA73B'}
          loading={isLoading || isSubmitting}
        />
      </div>
      <div className="container-c">
        <textarea 
          onChange={(e) => setKeyword(e.target.value)}
          tabIndex="0" 
          className="question" 
          value={keyword} 
          onKeyDown={handleKeySubmitNote}
          placeholder="keyword / question"
        />
        <textarea 
          onChange={(e) => setAnswer(e.target.value)}
          tabIndex="0" 
          className="answer" 
          value={answer} 
          onKeyDown={handleKeySubmitNote}
          placeholder="main points / answer"
        />
        <button 
          disabled={keyword.length === 0 || answer.length === 0 || isSubmitting} 
          tabIndex="0" 
          className={getButtonClassName(keyword, answer)} 
          onClick={handleSubmitNote}
        >
          <p>add</p>
        </button>
      </div>
    </div>
  );
};

function getButtonClassName(keyword, answer){
  if(keyword.length === 0 || answer.length === 0){
    return "addnote_disabled";
  }
  return "addnote";
}

export default HomeContainer;