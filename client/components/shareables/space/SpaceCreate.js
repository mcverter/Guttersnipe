import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../create-wizard/validateCreateShareableWizard';
import renderField from '../create-wizard/renderField';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import MapWithGeocoderInput from './MapWithGeocoderInput';

const SpaceCreate = (props) => {
    const { handleSubmit } = props;
    let position= [-73.99255, 40.689613];
    return (
        <form onSubmit={handleSubmit}>
            <Field name="location_chooser" component={MapWithGeocoderInput} />
            <Field name="space_notes" type="text" component={renderField} label="Additional Notes"/>
            <div>
                <button type="submit" className="next">Next</button>
            </div>
        </form>
    );
};

SpaceCreate.propTypes = {
    handleSubmit: PropTypes.func
};

export default reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(SpaceCreate);