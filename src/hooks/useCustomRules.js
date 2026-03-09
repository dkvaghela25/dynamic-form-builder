import { useMemo } from "react";

const useCustomRules = (label = "This field", rules = []) => {

    const finalRules = useMemo(() => {
        const finalRules = {};

        rules.forEach((rule) => {

            const { type, value } = rule;

            switch (type) {

                case 'required': {
                    finalRules.required = {
                        value,
                        message: `${label} is required field`
                    }
                    break;
                }

                case 'minLength': {
                    finalRules.minLength = {
                        value,
                        message: `${label} should contain at least ${value} characters`
                    };
                    break;
                }

                case 'maxLength': {
                    finalRules.maxLength = {
                        value,
                        message: `${label} should not contain more than ${value} characters`
                    };
                    break;
                }

                case 'min': {
                    finalRules.min = {
                        value,
                        message: `${label} should be grater than ${value}`
                    };
                    break;
                }

                case 'max': {
                    finalRules.max = {
                        value,
                        message: `${label} should be less than ${value}`
                    };
                    break;
                }
                
                case 'minDate': {
                    finalRules.min = {
                        value,
                        message: `${label} date should be after ${new Date(value).toLocaleDateString()}`
                    };
                    break;
                }
                
                case 'maxDate': {
                    finalRules.max = {
                        value,
                        message: `${label} date should be before ${new Date(value).toLocaleDateString()}`
                    };
                    break;
                }
                
                case 'minDateTime': {
                    finalRules.min = {
                        value,
                        message: `${label} date should be after ${new Date(value).toLocaleString()}`
                    };
                    break;
                }
                
                case 'maxDateTime': {
                    finalRules.max = {
                        value,
                        message: `${label} date should be before ${new Date(value).toLocaleString()}`
                    };
                    break;
                }

                case 'minSelected': {
                    finalRules.validate = {
                        ...(finalRules.validate || {}),
                        minSelected: (inputValue) =>
                            inputValue.length >= value || `Select at least ${value} options`
                    }
                    break;
                }

                case 'maxSelected': {
                    finalRules.validate = {
                        ...(finalRules.validate || {}),
                        maxSelected: (inputValue) =>
                            inputValue.length <= value || `More than ${value} options are not allowed`
                    }
                    break;
                }

                case 'pattern': {
                    finalRules.pattern = {
                        value: RegExp(value),
                        message: `Invalid ${label}`
                    };
                    break;
                }

            }
        })

        console.log(finalRules);

        return finalRules;
    }, [label, rules])

    return finalRules;

}

export default useCustomRules;