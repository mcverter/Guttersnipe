import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchRandomKropotkin} from '../../actions/kropotkins/kropotkinActions';
import Button from 'react-bootstrap/lib/Button';
export class KropotkinQuote extends Component {

  componentWillMount() {
    this.props.fetchRandomKropotkin();
  }

  render() {
    const {isFetchingKropotkin, kropotkinFetchError, paragraph} = this.props.kropotkin;
    if (isFetchingKropotkin || kropotkinFetchError || ! paragraph) {
      return <h1 />;
    }
    return (
      <div id="kropotkin-quote-outer">
        <div id="kropotkin-quote-inner">
          <h2><span>{paragraph}</span></h2>
        </div>
        <div id="kropotkin-source">
          <h3><a href="http://www.gutenberg.org/files/23428/23428-h/23428-h.htm">The Conquest of Bread</a> by <a href="http://en.wikipedia.org/wiki/Peter_Kropotkin">Pyotr Alexeivitch Kropotkin</a></h3>
        </div>
        <div className="text-center">
        <Button bsSize="large" role="button" bsStyle="warning" onClick={this.props.fetchRandomKropotkin} >New Quote</Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRandomKropotkin: () => {
      dispatch(fetchRandomKropotkin());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    kropotkin: state.kropotkin
  };
};

KropotkinQuote.propTypes = {
  fetchRandomKropotkin: PropTypes.func,
  isFetchingKropotkin: PropTypes.bool,
  kropotkinFetchError: PropTypes.bool,
  kropotkin: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(KropotkinQuote);
