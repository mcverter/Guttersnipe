import TimeCreate from  '../shareables/create-wizard/TimeCreate'
import TimeEdit from '../shareables/time/TimeEdit'
import TimeFull from '../shareables/time/TimeFull'
import Panel from 'react-bootstrap/lib/Panel'
import React, {Component, PropTypes} from 'react';
class ProfilePage extends Component {

}

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.showSchedule = this.showSchedule.bind(this)
  }

  showSchedule() {
    const {schedule} = this.props;
    if (schedule) {
      return (
        <Panel>
        <div> Create a schedule</div>
          <TimeCreate />
        </Panel>
      )
    } else {
      return (
       <Panel>
            <Button type="button" onClick={this.toggleTimeEdit}>
              {this.state.timeEdit ? "Confirm Time" : "Edit Time" }</Button>
            {this.state.timeEdit ?
              <TimeEdit/> : <TimeFull time={time} headline={headline}/> }
          </Panel>
      );
    }
  }
  render() {
    const {username, expiration, schedule, isAdmin, fullName, email} = this.props;

    return (
      <div>
        <div id="welcome-pg">
          <h2> Welcome to Guttersnipe, {username} </h2>
          <h2> Profile </h2>
          {isAdmin && <div><strong> Admin Account </strong> <br /></div>}
          <div><strong> Full Name: </strong> {fullName}</div>
          <div><strong> Email </strong> {email}</div>
          <div><strong> Expiration Date </strong> {expiration}</div>
          <div><strong> Schedule </strong> {schedule}</div>
        </div>
        <div> Availability Schedule
          {this.showSchedule()}
        </div>
        <div>Messages

        </div>
        <div><Link to="/shareables"> Shareable List</Link></div>
        <div><Link to="/shareables/create"> Create Shareable </Link></div>
      </div>
    );
  }
}

export default ProfilePage;
