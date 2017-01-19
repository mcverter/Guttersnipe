import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../create-wizard/validateCreateShareableWizard';
import renderField from '../create-wizard/renderField';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import MapWithGeocoder from './MapWithGeocoder';

const SpaceCreate = (props) => {
    const { handleSubmit } = props;
    let position= [-73.99255, 40.689613];
    return (
        <form onSubmit={handleSubmit}>
            <MapWithGeocoder

            />
            <Field name="longitude" type="text" component={renderField} label="Longitude"/>
            <Field name="latitude" type="text" component={renderField} label="Latitude"/>
            <Field name="canonical_address" type="text" component={renderField} label="Canonical Address"/>
            <Field name="alternate_names" type="text" component={renderField} label="Alternate names"/>
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