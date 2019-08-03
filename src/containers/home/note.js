import React from 'react'
import PropTypes from 'prop-types';

var FontAwesome = require('react-fontawesome');

const NoteContainer = ({note, onDeleteNote, loading}) => (
  <div>
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
          className={note.Important ? '_button btn-panel-button calendar-check' : '_button btn-panel-button calendar-uncheck'}>
            <FontAwesome name="calendar-check-o"/>
          </button>
        </div>
      </div>
      <div className="btn-panel-hidden">
        <button disabled={loading} tabIndex="-1" className="_button btn-panel-button" onClick={onDeleteNote}>
          <FontAwesome name="trash-o"/>
        </button>
      </div>
    </div>
    <hr/>
  </div>
)

NoteContainer.propTypes = {
    note: PropTypes.object.isRequired,
    onDeleteNote: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default NoteContainer