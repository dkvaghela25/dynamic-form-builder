
export const getRuleValue = (validationRules, ruleType) => {
    return validationRules.find(rule => rule.type === ruleType)?.value
}