const buildValidator = (fieldRules) => {
  return (reqBody) => {
    let hasError = false;
    const errors = {};

    for (const fieldName in fieldRules) {
      const field = reqBody[fieldName];
      const fieldRule = fieldRules[fieldName];
      const fieldError = validateField(fieldName, field, fieldRule);
      if (fieldError) {
        errors[fieldName] = fieldError;
        hasError = true;
      }
    }

    if (hasError) {
      const error = new Error();
      error.message = { error: 'Incorrect body format', detail: errors };
      error.statusCode = 400;
      throw error;
    }
  };
};

const validateField = (fieldName, field, fieldRule) => {
  if (!field) {
    return `${fieldName} is required`;
  }
  const { type, minLen, maxLen, minVal, maxVal } = fieldRule;
  if (type && typeof field !== type) {
    return `${fieldName} must be a ${type}`;
  }
  if (minLen && field.length < minLen) {
    return `${fieldName} must be greater than ${minLen} characters long`;
  }
  if (maxLen && field.length > maxLen) {
    return `${fieldName} must be less than ${maxLen} characters long`;
  }
  if (minVal && field < minVal) {
    return `${fieldName} must be greater than ${minVal}`;
  }
  if (maxVal && field > maxVal) {
    return `${fieldName} must be less than ${maxVal}`;
  }
  return null; // no error
};

module.exports = buildValidator;
