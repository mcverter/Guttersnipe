import React, {PropTypes} from 'react';
import { Field, reduxForm, FormSection } from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';
import {renderTextField} from '../create-wizard/renderField';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import MapWithGeocoderInput from './MapWithGeocoderInput';

const SpaceCreate = ({ handleSubmit, previousPage, pos }) => {
    let position = pos || [-73.99255, 40.689613];
    return (
        <div> Create a Map for your resource
        <form onSubmit={handleSubmit}>
            <FormSection name="space">
                <Field name="map" validate={required} component={MapWithGeocoderInput} />
                <Field name="notes" type="text" component={renderTextField} label="Additional Notes"/>
            </FormSection>

            <div>
               <button type="button" className="previous" onClick={previousPage}>Previous</button>
               <button type="submit" className="next">Next</button>
            </div>
        </form>
        </div>
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