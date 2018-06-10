export const required = value => value ? undefined : 'Required';

 const validateCreateShareableWizard = values => {
   console.log("values", values);
     const errors = {};
     if (!values.headline) {
         errors.headline = 'Required';
     }
     if (!values.summary) {
         errors.summary = 'Required';
     }
   if (!values.summary) {
     errors.summary = 'Required';
   }
   if(!values.thing_type) {
       errors.thing_type = 'Required';
   }
 };

export default validateCreateShareableWizard;
