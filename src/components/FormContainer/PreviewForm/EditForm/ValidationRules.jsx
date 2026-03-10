import { useCallback, useState } from "react";
import Actions from "./Actions";
import Select from "../../../ui/Select";

const ValidationRules = ({ availableRules, validationRules, setFormData }) => {

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
            "maxFiles": "minFiles",
            "minFiles": "maxFiles",
        }

        const { type, value } = inputFields;

        let message = "";

        if (!type) message = "Please Select Rule"
        if (!value) message = "Please Select Value"

        message = (type.startsWith("min") && !type.includes("Date"))
            ? Number(value) > Number(getRuleValue(validationMap[type]))
                ? `${type} value can not be grater than ${validationMap[type]}` : ""
            : Number(value) < Number(getRuleValue(validationMap[type]))
                ? `${type} value can not be less than ${validationMap[type]}` : ""

        message = (type.startsWith("min") && type.includes("Date"))
            ? value > getRuleValue(validationMap[type])
                ? `${type} value can not be grater than ${validationMap[type]}` : ""
            : value < getRuleValue(validationMap[type])
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
            case "maxDate": return "date"
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
        }
    }

    return (
        <>
            <div className="mt-1 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-base font-semibold text-slate-800">Validation Rules</div>

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

                {(availableRules?.length !== 0) && <div className="mt-1 grid grid-cols-1 gap-3 md:grid-cols-[3fr_3fr_1fr] md:gap-4">

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
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                        type={getInputType(inputFields.type)}
                    />

                    <button onClick={handleClick} className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"> {isEditing ? "Edit" : "Add"}</button>
                </div>}
                {error && <p className="text-sm pl-3 text-red-500 -mt-2"> * {error}</p>}
            </div>
        </>
    )
}

export default ValidationRules;