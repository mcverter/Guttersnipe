import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchRandomKropotkin} from '../../actions/kropotkins/kropotkinActions';

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
      <div className="kropotkin-quote RedOnBlack">
        <div className="text-center BlackOnRed">
          <h2><span>{paragraph}</span></h2>
        </div>
        <div>
          <h3><a href="http://www.gutenberg.org/files/23428/23428-h/23428-h.htm">The Conquest of Bread</a> by <a href="http://en.wikipedia.org/wiki/Peter_Kropotkin">Pyotr Alexeivitch Kropotkin</a></h3>
        </div>
        <button className="btn btn-danger" role="button" onClick={this.props.fetchRandomKropotkin} >New Quote</button>
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
