import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as shareableActions from '../../actions/shareableActions';

export default class ShareablePage extends React.Component {
    render() {
        return <div> Shareable Page</div>;
    }
}
    /*
  constructor(props, context) {
    super(props, context);

    this.state = {
      shareable: Object.assign({}, props.shareable),
      errors: {},
      saving: false
    };

    this.updateShareableState = this.updateShareableState.bind(this);
    this.saveShareable = this.saveShareable.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.shareable.id != nextProps.shareable.id) {
      // Necessary to populate form when existing shareable is loaded directly.
      this.setState({shareable: Object.assign({}, nextProps.shareable)});
    }
  }

  updateShareableState(event) {
    const field = event.target.name;
    let shareable = this.state.shareable;
    shareable[field] = event.target.value;
    return this.setState({shareable: shareable});
  }

  shareableFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.shareable.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  saveShareable(event) {
    event.preventDefault();

    if (!this.shareableFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveShareable(this.state.shareable)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Shareable saved');
    this.context.router.push('/shareables');
  }

  render() {
    return (
      <ShareableForm
        allAuthors={this.props.authors}
        onChange={this.updateShareableState}
        onSave={this.saveShareable}
        shareable={this.state.shareable}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
*/

/*
ManageShareablePage.propTypes = {
  shareable: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageShareablePage.contextTypes = {
  router: PropTypes.object
};

function getShareableById(shareables, id) {
  const shareable = shareables.filter(shareable => shareable.id == id);
  if (shareable) return shareable[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const shareableId = ownProps.params.id; // from the path `/shareable/:id`

  let shareable = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (shareableId && state.shareables.length > 0) {
    shareable = getShareableById(state.shareables, shareableId);
  }

  return {
    shareable: shareable,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(shareableActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageShareablePage);
*/
