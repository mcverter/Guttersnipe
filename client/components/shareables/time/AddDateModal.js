var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');

class AddDateModal extends React.Component {
    constructor(props) {
        super(props);
        let {slot} = props;

    }

    render() {
        return (
            <div>
                <h2 ref="subtitle">Hello</h2>
                <button onClick={this.closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </div>
        )
    }
}