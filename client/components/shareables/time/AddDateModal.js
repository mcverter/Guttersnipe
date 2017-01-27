import React, {PropTypes} from 'react';

import ReactModal from 'react-modal';

import TimePicker from 'react-bootstrap-time-picker';
import Button from 'react-bootstrap/lib/Button';

const AddDateModal = ({contentLabel, isOpen, customStyles, closeModal,
  repeating, day, date, start,
  handleStartTimeChange, handleDurationChange, handleDateSelection, handleRepeatToggle}) => (
  <ReactModal contentLabel={contentLabel} isOpen={isOpen} style={customStyles} >
    <div className="modal-header">
      <Button type="button" className="close" onClick={closeModal}>&times;</Button>
      <h2 className="modal-title" id="deployModalLabel">Choose Schedule</h2>
    </div>
    <div>
      <div className="modal-body">
        Event occurs: {repeating ? `Every ${day}` : date}
        <br />
        Repeating Event:
        <input type="checkbox" checked={repeating} onChange={handleRepeatToggle} />

        <h2> Start Time </h2>
        <TimePicker name="start" onChange={handleStartTimeChange} initialValue={start} />
        <h2> Duration </h2>
        <select name="duration" onChange={handleDurationChange} >
          {[...Array(47).keys()].map((i) =>
            ( <option key={i++} value={i * 30}>
              {i % 2 ? `${(i - 1) / 2} hr 30 min` : `${i / 2} hr`}
            </option>))}
        </select>
      </div>
      <div className="modal-footer">
        <Button onClick={handleDateSelection}> ok</Button>
        <Button onClick={closeModal}>close</Button>
      </div>
    </div>
  </ReactModal>
);

AddDateModal.propTypes = {
  customStyles: PropTypes.object,
  isOpen: PropTypes.bool,
  repeating: PropTypes.bool,
  contentLabel: PropTypes.string,
  start: PropTypes.string,
  day: PropTypes.string,
  date: PropTypes.string,
  handleRepeatToggle: PropTypes.func,
  handleStartTimeChange: PropTypes.func,
  handleDurationChange: PropTypes.func,
  handleDateSelection: PropTypes.func,
  closeModal: PropTypes.func
};

export default AddDateModal;
