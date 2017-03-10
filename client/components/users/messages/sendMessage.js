/**
 * Created by mitchell on 3/6/17.
 */
import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'

class sendMessage extends Component {
  render() {
    return (
      <Panel>
      <div> Recipient</div>
        <input />
        <div> Message</div>
        <textarea />
        <button>Send Message</button>
      </Panel>
    )
  }
}
