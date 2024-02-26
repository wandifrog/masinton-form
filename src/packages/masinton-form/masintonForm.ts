import { useEffect, useState } from 'react';
import { objectsEqual } from './utils';


/**
 * A custom hook that manages form state, validation, and related actions.
 *
 * @function useMasintonForm
 * @param {MasintonForm} initialForm - The initial form data structure.
 * @param {MasintonValidation} [validation] - Optional validation rules for the form fields.
 * @returns {{
*   masintonForm: MasintonForm;
*   masintonWatch: { edited: boolean };
*   masintonChange: (key: string, value: any) => void;
*   masintonReplace: (formData: MasintonForm) => void;
*   masintonReset: () => void;
*   masintonSubmit: () => void;
*   masintonValidation: (options?: MasintonValidationOptions) => boolean;
* }} An object containing form state, functions, and validation methods.
*
* @example
* const MyForm = () => {
*   const { masintonForm, masintonValidation } = useMasintonForm(
*     initialFormData,
*     validationRules
*   );
*
*   const handleChange = (event) => {
*     masintonChange(event.target.name, event.target.value);
*   };
*
*   const handleSubmit = (event) => {
*     event.preventDefault();
*     const isFormValid = masintonValidation();
*     if (isFormValid) {
*       console.log('Form submitted successfully!', masintonForm);
*       // Handle form submission here
*     }
*   };
*
*   return (
*     // Render form fields and submit button, using masintonForm and handleChange
*   );
* };
*/
const useMasintonForm = (formData: MasintonForm, validation?: MasintonValidation) => {
  const [initialForm, setInitialForm] = useState(formData);
  const [masintonForm, setMasintonForm] = useState(initialForm);
  const [masintonWatch, setMasintonWatch] = useState({ edited: false });

  useEffect(() => {
    setMasintonForm(initialForm);
  }, [initialForm]);

  function masintonChange(key: string, value: any) {
    const newMasintonForm = structuredClone(masintonForm);
    newMasintonForm[key].value = value;

    if (objectsEqual(initialForm, newMasintonForm)) {
      setMasintonWatch({ edited: false });
    } else {
      setMasintonWatch({ edited: true });
    }
    setMasintonForm(newMasintonForm);
  }

  function masintonMultiChange(data: MasintonData) {
    const newMasintonForm = structuredClone(masintonForm);

    Object.keys(data).forEach((key) => {
      newMasintonForm[key].value = data[key];
    });

    if (objectsEqual(initialForm, newMasintonForm)) {
      setMasintonWatch({ edited: false });
    } else {
      setMasintonWatch({ edited: true });
    }
    setMasintonForm(newMasintonForm);
  }

  function masintonMagic(masintonData: MasintonData) {
    const newMasintonForm = structuredClone(masintonForm);
    const fields = Object.keys(masintonData);

    for (const field of fields) {
      if (newMasintonForm[field]) {
        newMasintonForm[field].value = masintonData[field];
      }
    }

    setInitialForm(newMasintonForm);
  }

  function masintonReplace(formData: MasintonForm) {
    setMasintonWatch({ edited: false });
    setInitialForm(formData);
  }

  function masintonReset() {
    setMasintonForm(initialForm);
  }

  function masintonSubmit() {
    const fields = Object.keys(masintonForm);
    const result = {};

    fields.forEach((field) => {
      Object.assign(result, { [field]: masintonForm[field].value });
    });

    return result;
  }

  function masintonValidation(options: MasintonValidationOptions = {
    ignoreValidation: undefined,
  }) {
    const newMasintonForm = structuredClone(masintonForm);
    const { ignoreValidation } = options;

    if (!ignoreValidation || !validation) return;
    ignoreValidation.forEach((type) => {
      newMasintonForm[type].error = false;
      newMasintonForm[type].errorMessage = '';
    });

    const filteredValidation = ignoreValidation
      ? Object.keys(validation).filter((fieldName) => !ignoreValidation.includes(fieldName))
      : Object.keys(validation);

    filteredValidation.forEach((type) => {
      for (const fieldValidation of validation[type]) {
        const fieldValue: string = newMasintonForm[type].value;
        const validate = fieldValidation.rule.test(fieldValue);

        if (!validate) {
          newMasintonForm[type].error = true;
          newMasintonForm[type].errorMessage = fieldValidation.errorMessage;
        } else {
          newMasintonForm[type].error = false;
          newMasintonForm[type].errorMessage = '';
        }
      }
    });

    setMasintonForm(newMasintonForm);

    const formIsValidate = Object.values(newMasintonForm).every((field) => !field.error);
    return formIsValidate;
  }

  return {
    masintonForm,
    masintonWatch,
    masintonChange,
    masintonMultiChange,
    masintonMagic,
    masintonReplace,
    masintonReset,
    masintonSubmit,
    masintonValidation,
  };
};

export default useMasintonForm;
