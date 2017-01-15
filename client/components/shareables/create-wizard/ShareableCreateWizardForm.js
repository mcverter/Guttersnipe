import React, { Component, PropTypes } from 'react';

import ShareableCreateStart from './ShareableCreateStart.js';
import ShareableCreateThing from '../thing/ThingCreate';
import ShareableCreateSpace from '../space/SpaceCreate';
import ShareableCreateTime from '../time/TimeCreate';
import ShareableCreateEnd from './ShareableCreateEnd';

class ShareableCreateWizardForm extends Component {
    constructor(props) {
        super(props);
        console.log("in shareable create wizard");
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page: 1
        }
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 })
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }

    render() {
        const {onSubmit} = this.props;
        const {page} = this.state
        return (
            <div>
                {page === 1 && <ShareableCreateStart onSubmit={this.nextPage}/>}
                {page === 2 && <ShareableCreateThing previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                {page === 3 && <ShareableCreateSpace onSubmit={this.nextPage}/>}
                {page === 4 && <ShareableCreateTime previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                {page === 5 && <ShareableCreateEnd previousPage={this.previousPage} onSubmit={onSubmit}/>}
            </div>
        )
    }
}

export default ShareableCreateWizardForm;