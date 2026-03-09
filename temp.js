const rules = {
  required: { value: true, message: "Text Input is required field" },
  minLength: { value: 3, message: "Text Input should contain at least 3 characters" },
  maxLength: { value: 5, message: "Text Input should not contain more than 5 characters" },
  // Custom validation logic
  validate: {
    noAdmin: (value) =>
      value.toLowerCase() !== "admin" || "The word 'admin' is not allowed",
    isNumber: (value) =>
      !isNaN(value) || "Only numeric characters are allowed"
  }
}
case 'minSelected': {
    finalRules.validate = {
        ...(finalRules.validate || {}),
        // If length is >= value, it's valid (true). Otherwise, return the message.
        minSelected: (inputValue) => 
            inputValue.length >= value || `${label} requires at least ${value} options`
    };
    break;
}
