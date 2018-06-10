import React, {Component} from 'react';

class Mailbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_id: null
    }
  }

  handleSelectEmail(id) {
    this.setState({ email_id: id });
  }

  render() {
    var email_id = this.state.email_id;
    if (email_id) {
      var mail = this.props.emails.filter(function(mail) {
        return mail.id == email_id;
      })[0];
      selected_email = <Email id={mail.id}
                              from={mail.from}
                              to={mail.to}
                              subject={mail.subject}
                              body={mail.body} />;
    } else {
      selected_email = <NoneSelected text="email" />;
    }

    return (
      <div>
        <EmailList emails={this.props.emails}
                   onSelectEmail={this.handleSelectEmail} />
        <div className="email-viewer">
          {selected_email}
        </div>
      </div>
    );
  }
}
