import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {sampleValueSelector, revealSelector} from './selectors';
import {sampleCalledAction} from './actions';

const ReduxComponent = ({sampleCheck, sampleValue, reveal}) => (
  <div className="redux-component">
    <span onClick={e=>sampleCheck(true)}> Click to reveal</span>
    {reveal && <p>{sampleValue}</p>}
  </div>
);

ReduxComponent.propTypes = {
  sampleCheck: PropTypes.func.isRequired,
  sampleValue: PropTypes.string.isRequired,
  reveal: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  sampleValue: sampleValueSelector(state),
  reveal: revealSelector(state)
});

const mapDispatchToProps = ({
  sampleCheck: sampleCalledAction
});

const ReduxComponentConnect = connect(
  mapStateToProps, mapDispatchToProps
)(ReduxComponent);

export default ReduxComponentConnect
