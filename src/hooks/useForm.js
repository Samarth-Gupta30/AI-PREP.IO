import { useState } from 'react';

export default function useForm(initialValues, validateConfig) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Handles input typing automatically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    
    // Clear individual error as the user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validates all inputs based on our configuration rules
  const validate = () => {
    let tempErrors = {};
    
    Object.keys(validateConfig).forEach((key) => {
      const value = values[key]?.trim() || '';
      const rules = validateConfig[key];

      if (rules.required && !value) {
        tempErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        tempErrors[key] = rules.message || 'Invalid format.';
      } else if (rules.minLength && value.length < rules.minLength) {
        tempErrors[key] = `Must be at least ${rules.minLength} characters.`;
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Returns true if no errors
  };

  return {
    values,
    errors,
    handleChange,
    validate,
    setValues
  };
}
