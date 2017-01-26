export const required = value => value ? undefined : 'Required';

 const validateCreateShareableWizard = values => {
     console.log('validating', values )
     const errors = {};
     debugger;
     if (!values.headline) {
         errors.headline = 'Required'
     }
     if (!values.summary) {
         errors.summary = 'Required'
     }
   if (!values.summary) {
     errors.summary = 'Required'
   }
   if(!values.thing_type) {
       errors.thing_type = 'Required'
   }
   console.log('errors', errors);

 };

export default validateCreateShareableWizard;
