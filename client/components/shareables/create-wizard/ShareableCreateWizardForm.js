import React, { Component, PropTypes } from 'react';
import ShareableCreateStart from './ShareableCreateStart.js';
import ThingCreate from '../thing/ThingCreate';
import SpaceCreate from '../space/SpaceCreate';
import TimeCreate from '../time/TimeCreate';
import ShareableCreateEnd from './ShareableCreateEnd';

class ShareableCreateWizardForm extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page: 1
        };
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 });
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 });
    }

    render() {
        const {onSubmit} = this.props;
        const {page} = this.state;
        return (
            <div>
                {page === 1 && <ShareableCreateStart onSubmit={this.nextPage}/>}
                {page === 2 && <ThingCreate previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                {page === 3 && <SpaceCreate previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                {page === 4 && <TimeCreate headline="foo" previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                {page === 5 && <ShareableCreateEnd previousPage={this.previousPage} onSubmit={onSubmit}/>}
            </div>
        );
    }
}

ShareableCreateWizardForm.propTypes = {
    handleSubmit: PropTypes.func
};


export default ShareableCreateWizardForm;