import React, { Component, PropTypes } from 'react';
import ShareableCreateWizardForm from './ShareableCreateWizardForm';

class ShareableCreateWizardPage extends Component {
  handleSubmit (values) {
    // Do something with the form values
    console.log('form values', values);
  }

  render() {
      this.handleSubmit = this.handleSubmit.bind(this);
    return (
      <ShareableCreateWizardForm onSubmit={this.handleSubmit} />
    );
  }
}

export default ShareableCreateWizardPage;