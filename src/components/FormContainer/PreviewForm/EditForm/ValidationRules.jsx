import { useCallback, useState } from "react";
import Actions from "./Actions";

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

    const handleClick = (e) => {
        e.preventDefault();

        if (!inputFields.type) return setError("Please Select Rule");
        if (!inputFields.value) return setError("Please Select Value");
        if (inputFields.type === "max" && inputFields.value < getRuleValue("min")) return setError("max value can not be less than min");
        if (inputFields.type === "min" && inputFields.value > getRuleValue("max")) return setError("min value can not be grater than max");
        if (inputFields.type === "maxLength" && inputFields.value < getRuleValue("minLength")) return setError("maxLength value can not be garter than minLength");
        if (inputFields.type === "minLength" && inputFields.value > getRuleValue("maxLength")) return setError("minLength value can not be less than maxLength");

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
                    {validationRules.map((rule, index) => {
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
                        value="required"
                        type="checkbox"
                        className="h-4 w-4 accent-indigo-600"
                        checked={getRuleValue("required")}
                        onChange={handleChecked}
                    />
                    <label htmlFor="" className="text-sm font-medium text-slate-700">Required</label>
                </div>

                {(availableRules?.length !== 0) && <div className="mt-1 grid grid-cols-1 gap-3 md:grid-cols-[3fr_3fr_1fr] md:gap-4">

                    <select
                        disabled={isEditing}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                        name="type"
                        value={inputFields.type}
                        onChange={handleChange}
                    >
                        <option value="">Select Rule</option>
                        {availableRules?.map(rule => {
                            return <option key={rule} value={rule}>{rule}</option>
                        })}
                    </select>

                    <input
                        placeholder={`${!inputFields.type ? "First select rule for defining it's value" : ""} ${inputFields.type === "pattern" ? "(e.g , ^\\+?\\d{10,15}$)" : ""}`}
                        disabled={!inputFields.type}
                        name="value"
                        value={inputFields.value}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                        type={inputFields.type === "pattern" ? "text" : "number"}
                    />

                    <button onClick={handleClick} className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"> {isEditing ? "Edit" : "Add"}</button>
                </div>}
                {error && <p className="text-sm pl-3 text-red-500 -mt-2"> * {error}</p>}
            </div>
        </>
    )
}

export default ValidationRules;