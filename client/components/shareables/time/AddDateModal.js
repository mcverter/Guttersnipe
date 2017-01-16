import React from 'react'
import {Component} from 'react';
import ReactModal from 'react-modal';
import  TimePicker  from 'rc-time-picker'

class AddDateModal extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let {contentLabel, isOpen, onAfterOpen,
            closeModal, customStyles} = this.props;

        console.log('add date modal props', this.props)
        return (
            <Modal
                contentLabel={contentLabel}
                isOpen={isOpen}
                onAfterOpen={onAfterOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div class="modal-header">
                    <button type="button" class="close" onClick={closeModal}>&times;</button>
                    <h2 class="modal-title" id="deployModalLabel">Choose Schedule</h2>
                </div>

                <div class="modal-body">
                <TimePicker />
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" onClick={closeModal}>Cancel</button>
                    <button type="button" class="btn btn-primary" >OK</button>
                </div>

            </Modal>
        );
    }
}

export default AddDateModal;

/*
 <div class="modal-header">
 <button type="button" class="close" ng-click="cancelSchedule($event)">&times;</button>
 <h2 class="modal-title" id="deployModalLabel">Choose Schedule</h2>
 </div>
 <div class="modal-body">
 <ng-form id="scheduleForm" name="scheduleForm">
 <div>
 <div class="checkbox">
 <h3>  <label>
 <input type="checkbox" ng-model="event.repeating">  Repeating Event
 </label> </h3>
 </div>
 </div>
 <div>
 <h2>    Event occurs
 <span ng-hide="event.repeating"> on {{event.start | date: 'fullDate'}} </span>
 <span ng-show="event.repeating"> every {{ event.start | date: 'EEEE'}}</span>
 </h2>
 <h4>    Start Time </h4>
 <timepicker ng-model="event.start" hour-step=1 minute-step=30></timepicker>
 <h4>    Duration </h4>
 <timepicker ng-model="event.end" hour-step=1 minute-step=30></timepicker>
 </div>
 </ng-form>
 </div>

 <div class="modal-footer">
 <button type="button" class="btn btn-default" ng-click="cancelSchedule($event)">Cancel</button>
 <button type="button" class="btn btn-primary" ng-disabled="invalidTimes()" ng-click="addSchedule($event, event)">OK</button>
 </div>

 */