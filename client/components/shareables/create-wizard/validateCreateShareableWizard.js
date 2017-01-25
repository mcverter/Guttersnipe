export const required = value => value ? undefined : 'Required';
  
 const validateCreateShareableWizard = values => {
     console.log('validating', values )
     const errors = {};
     if (!values.headline) {
         errors.headline = 'Required'
     }
     if (!values.summary) {
         errors.summary = 'Required'
     }
  };
  
export default validateCreateShareableWizard;