const validationMap = {
    max: { peer: "min", label: "max value can not be less than min" },
    min: { peer: "max", label: "min value can not be greater than max" },
    maxLength: { peer: "minLength", label: "maxLength can not be less than minLength" },
    minLength: { peer: "maxLength", label: "minLength can not be greater than maxLength" },
    maxDate: { peer: "minDate", label: "maxDate can not be less than minDate" },
    minDate: { peer: "maxDate", label: "minDate can not be greater than maxDate" },
    // ... add others like maxFiles/minFiles here
};

const validate = () => {
    const { type, value } = inputFields;

    if (!type) return setError("Please Select Rule");
    if (!value) return setError("Please Select Value");

    const rule = validationMap[type];
    if (rule) {
        const peerValue = getRuleValue(rule.peer);
        if (peerValue !== undefined) {
            const isMinType = type.toLowerCase().includes("min");
            const isInvalid = isMinType 
                ? Number(value) > Number(peerValue) 
                : Number(value) < Number(peerValue);

            if (isInvalid) return setError(rule.label);
        }
    }
};
