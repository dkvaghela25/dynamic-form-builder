export const validateForm = (label, rules = []) => {
    const finalRules = {};

    rules.forEach((rule) => {
        const { type, value } = rule;
        switch (type) {

            case 'required': {
                finalRules.required = `${label || "This"} is required field`;
                break;
            }

            case 'minLength': {
                finalRules.minLength = {
                    value,
                    message: `${label || "This"} should contain at least ${value} characters`
                };
                break;
            }
            
            case 'maxLength': {
                finalRules.maxLength = {
                    value,
                    message: `${label || "This"} should not contain more than ${value} characters`
                };
                break;
            }
            
            case 'min': {
                finalRules.min = {
                    value,
                    message: `${label || "This"} should be grater than ${value}`
                };
                break;
            }
            
            case 'max': {
                finalRules.max = {
                    value,
                    message: `${label || "This"} should be less than ${value}`
                };
                break;
            }
            
            case 'pattern': {
                finalRules.pattern = {
                    value: new RegExp(value),
                    message: `Invalid ${label}`
                };
                break;
            }

        }
    })

    console.log(finalRules);

    return finalRules;
}
