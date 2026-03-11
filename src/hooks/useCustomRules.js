import { useMemo } from "react";

const useCustomRules = (inputType, label = "This field", rules = []) => {

    const finalRules = useMemo(() => {
        const finalRules = {};

        rules.forEach((rule) => {

            const { type, value } = rule;

            switch (type) {

                case 'required': {
                    if (inputType === "date-range" && value === true) {

                        finalRules.validate = {
                            ...(finalRules.validate || {}),
                            requiredDateRange: (dateObject) => {
                                const { startDate, endDate } = dateObject;
                                if (!startDate) return "Start date is required"
                                if (!endDate) return "End date is required"
                                return true;
                            }
                        }

                    } else {

                        finalRules.required = {
                            value,
                            message: `${label} is required field`
                        }
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

                case 'pattern': {
                    finalRules.pattern = {
                        value: new RegExp(value),
                        message: `Invalid ${label}`
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

                case 'minStartDate': {
                    finalRules.validate = {
                        ...(finalRules.validate || {}),
                        minStartDate: ({ startDate }) => {
                            if (new Date(startDate) < new Date(value)) return `Start date should be after ${new Date(value).toLocaleDateString()}`
                            return true;
                        }
                    }
                    break;
                }

                case 'maxStartDate': {
                    finalRules.validate = {
                        ...(finalRules.validate || {}),
                        maxStartDate: ({ startDate }) => {
                            if (new Date(startDate) > new Date(value)) return `Start date should be before ${new Date(value).toLocaleDateString()}`
                            return true;
                        }
                    }
                    break;
                }

                case 'dateRange': {
                    finalRules.validate = {
                        ...(finalRules.validate || {}),
                        rangeDate: ({ startDate, endDate }) => {

                            const millisecondsInOneDay = 1000 * 60 * 60 * 24;
                            const startDateDay = (new Date(startDate).getTime()) / (millisecondsInOneDay);
                            const endDateDay = (new Date(endDate).getTime()) / millisecondsInOneDay;
                            const dayDifference = endDateDay - startDateDay;

                            if (dayDifference !== Math.abs(dayDifference)) return `End date should be after ${new Date(startDate).toLocaleDateString()}`
                            if (dayDifference > value) return `End date should not exceed limit of ${value} days range`
                            return true;
                        }
                    }
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

                case 'minFiles': {
                    finalRules.validate = {
                        ...(finalRules.validate || {}),
                        minFiles: (inputValue) =>
                            inputValue.length >= value || `Upload at least ${value} files`
                    }
                    break;
                }

                case 'maxFiles': {
                    finalRules.validate = {
                        ...(finalRules.validate || {}),
                        maxFiles: (inputValue) =>
                            inputValue.length <= value || `More than ${value} files are not allowed`
                    }
                    break;
                }

                case 'maxSize': {
                    finalRules.validate = {
                        ...(finalRules.validate || {}),
                        maxSize: (files) => {
                            const fileArray = Array.from(files);
                            for (const file of fileArray) {
                                if (file.size > (value * 1024)) {
                                    return `Uploaded file ${file.name} exceeds file size limit. Please upload a file smaller than ${value} KB.`
                                }
                            }
                            return true;
                        }
                    }
                    break;
                }

            }
        })
        console.log(finalRules);
        return finalRules;
    }, [inputType, label, rules])

    return finalRules;

}

export default useCustomRules;
