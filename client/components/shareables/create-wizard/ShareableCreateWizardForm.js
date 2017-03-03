import React, { Component, PropTypes } from 'react';

import InstructionsForCreate from './InstructionsForCreate';
import ConsentForCreate from './ConsentForCreate';
import HeadlineSummaryCreate from './HeadlineSummaryCreate.js';
import ThingCreate from './ThingCreate';
import SpaceCreate from './SpaceCreate';
import TimeCreate from './TimeCreate';
import ConfirmCreate from './ConfirmCreate';

class ShareableCreateWizardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.goToPageNumber = this.goToPageNumber.bind(this);
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
   nextPage() {
    this.setState({ page: this.state.page + 1 });
  }
  goToPageNumber(pgNum) {
    this.setState({page: pgNum})
  }

  render() {
    const {page} = this.state;
    return (
      <div className="shareable-create-wizard-form">
        {page === 1 && <InstructionsForCreate nextPage={this.nextPage}/>}
        {page === 2 && <ConsentForCreate previousPage={this.previousPage} nextPage={this.nextPage} />}
        {page === 3 && <HeadlineSummaryCreate  previousPage={this.previousPage} nextPage={this.nextPage}/>}
        {page === 4 && <ThingCreate previousPage={this.previousPage} nextPage={this.nextPage} />}
        {page === 5 && <SpaceCreate previousPage={this.previousPage}  nextPage={this.nextPage} />}
        {page === 6 && <TimeCreate previousPage={this.previousPage}  nextPage={this.nextPage} />}
        {page === 7 && <ConfirmCreate
          previousPage={this.previousPage} onSubmit={this.props.handleSubmit}/>}
      </div>
    );
  }
}

ShareableCreateWizardForm.propTypes = {
  handleSubmit: PropTypes.func
};

export default ShareableCreateWizardForm;
