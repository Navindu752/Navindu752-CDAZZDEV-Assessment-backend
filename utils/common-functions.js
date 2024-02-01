const joiErrorFormatter = (rawErrors) => {
  // Initialize an empty object to store the formatted errors
  const errors = {};

  // Retrieve the details of the raw errors
  const details = rawErrors.details;

  // Iterate over each detail and store the error message under the corresponding path
  details.forEach((detail) => {
    errors[detail.path] = [detail.message];
  });

  // Return the formatted errors
  return errors;
};

const validateInput = (schema, data) => {
  // Validate the input data using the provided schema
  const validationResult = schema(data, { abortEarly: false });

  // If there are validation errors, format and return the error message
  if (validationResult.error) {
    return joiErrorFormatter(validationResult.error);
  }

  // If there are no validation errors, return the validated input data
  return validationResult;
};

module.exports = {
  validateInput,
};
