import { useCallback, useState } from "react";
import Actions from "./Actions";
import Select from "../../../../../ui/Select";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const ValidationRules = ({ displayId, availableRules, validationRules, setFormData, handleToggle }) => {

    const [inputFields, setInputFields] = useState({
        type: "",
        value: ""
    })

    const [error, setError] = useState("")
    const [isEditing, setIsEditing] = useState(false);

    const getRuleValue = useCallback((rule) => {
        return validationRules?.find(currRule => currRule.type === rule)?.value
    }, [validationRules])

    const validateRules = () => {

        const validationMap = {
            "max": "min",
            "min": "max",
            "maxLength": "minLength",
            "minLength": "maxLength",
            "maxDate": "minDate",
            "minDate": "maxDate",
            "maxDateTime": "minDateTime",
            "minDateTime": "maxDateTime",
            "maxStartDate": "minStartDate",
            "minStartDate": "maxStartDate",
            "maxFiles": "minFiles",
            "minFiles": "maxFiles",
        }

        const { type, value } = inputFields;

        let message = "";

        if (!type) return "Please Select Rule"

        if (!value) return message = "Please Select Value"

        const val1 = type.includes("Date")
            ? new Date(value)
            : Number(value);

        const val2 = type.includes("Date")
            ? new Date(getRuleValue(validationMap[type]))
            : Number(getRuleValue(validationMap[type]));

        message = type.startsWith("min")
            ? val1 > val2
                ? `${type} value can not be grater than ${validationMap[type]}` : ""
            : val1 < val2
                ? `${type} value can not be less than ${validationMap[type]}` : ""

        return message;
    }

    const handleClick = (e) => {
        e.preventDefault();

        const validationErrorMessage = validateRules();
        if (validationErrorMessage) return setError(validationErrorMessage);

        const existingRule = validationRules.find(currRule => currRule.type === inputFields.type);

        if (isEditing || existingRule) {
            const updatedRules = validationRules.map(currRule => {
                if (currRule.type === inputFields.type) {
                    return { type: inputFields.type, value: inputFields.value }
                } else {
                    return currRule;
                }
            })
            setFormData(prev => { return { ...prev, validationRules: updatedRules } })
        } else {
            setFormData(prev => { return { ...prev, validationRules: [...validationRules, inputFields] } })
        }

        setInputFields({
            type: "",
            value: ""
        })
        setError("")
        setIsEditing(false)
    }

    const handleChecked = (e) => {
        const updatedRules = validationRules.map(rule => {
            if (rule.type === "required") {
                return { ...rule, value: e.target.checked }
            } else {
                return rule;
            }
        })
        setFormData(prev => { return { ...prev, validationRules: updatedRules } })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields(prev => { return { ...prev, [name]: value } })
    }

    const handleDelete = useCallback((e, index) => {
        e.preventDefault();
        const updatedRules = validationRules.filter((currRule, currIndex) => currIndex !== index)
        setFormData(prev => { return { ...prev, validationRules: updatedRules } })
    }, [validationRules, setFormData])

    const handleEdit = useCallback((e, index) => {
        e.preventDefault();
        const currRule = validationRules.find((currRule, currIndex) => currIndex === index);
        setInputFields(currRule)
        setIsEditing(true);
    }, [validationRules])

    const getInputType = (validationRuleType) => {
        switch (validationRuleType) {
            case "pattern": return "text"
            case "minDate":
            case "maxDate":
            case "minStartDate":
            case "maxStartDate": return "date";
            case "minDateTime":
            case "maxDateTime": return "datetime-local"
            default: return "number"
        }
    }

    const getPlaceholder = (validationRuleType) => {
        switch (validationRuleType) {
            case "": return "First select rule for defining it's value"
            case "pattern": return "(e.g , ^\\+?\\d{10,15}$)"
            case "maxSize": return "Enter file size in KB"
            case "dateRange": return "Enter range in Days"
        }
    }

    return (
        <>
            {validationRules &&
                <div className="mt-1 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div onClick={() => handleToggle("validation-rules")} className="text-base cursor-pointer flex items-center justify-between font-semibold text-slate-800">
                        <span>Validation Rules</span>
                        {displayId === "validation-rules" ? <GoChevronUp className="w-7 h-7" /> : <GoChevronDown className="w-7 h-7" />}
                    </div>


                    {displayId === "validation-rules" &&
                        <>
                            <hr className="border-slate-300" />

                            <div className="rounded-lg border border-slate-200 bg-white">
                                <div className="grid grid-cols-3 bg-slate-100 text-xs font-extrabold uppercase tracking-wide text-slate-600">
                                    <div className="p-2 text-center">Rule</div>
                                    <div className="p-2 text-center">Value</div>
                                    <div className="p-2 text-center">Action</div>
                                </div>
                                {validationRules?.map((rule, index) => {
                                    return (
                                        <div className="grid grid-cols-3 font-semibold" key={index}>
                                            <div className="flex justify-center items-center border-t border-slate-200 p-2 text-center text-sm capitalize text-slate-700"><span>{rule.type}</span></div>
                                            <div className="flex justify-center items-center border-t border-slate-200 p-2 text-center text-sm text-slate-700">{rule?.value?.toString()}</div>
                                            {rule.type !== "required" && <Actions text="Rule" index={index} handleEdit={handleEdit} handleDelete={handleDelete} />}
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="flex items-center gap-3 rounded-lg bg-white p-3">
                                <input
                                    id="required-checkbox"
                                    value="required"
                                    type="checkbox"
                                    className="h-4 w-4 accent-indigo-600"
                                    checked={getRuleValue("required")}
                                    onChange={handleChecked}
                                />
                                <label htmlFor="required-checkbox" className="text-sm font-medium text-slate-700">Required</label>
                            </div>

                            {availableRules && <div className="mt-1 grid grid-cols-1 gap-3 md:grid-cols-[3fr_3fr_0.8fr]">

                                <Select
                                    multiple={false}
                                    name="type"
                                    value={inputFields.type}
                                    placeholder="Select Rule"
                                    options={availableRules}
                                    handleChange={handleChange}
                                />

                                <input
                                    placeholder={getPlaceholder(inputFields.type)}
                                    disabled={!inputFields.type}
                                    name="value"
                                    value={inputFields.value}
                                    onChange={handleChange}
                                    className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                                    type={getInputType(inputFields.type)}
                                />

                                <button onClick={handleClick} className="cursor-pointer rounded-sm bg-indigo-600 text-[13px] font-semibold text-white transition hover:bg-indigo-700"> {isEditing ? "Edit" : "Add"}</button>
                            </div>}
                            {error && <p className="text-sm pl-3 text-red-500 -mt-2"> * {error}</p>}
                        </>
                    }
                </div>
            }
        </>
    )
}

export default ValidationRules;