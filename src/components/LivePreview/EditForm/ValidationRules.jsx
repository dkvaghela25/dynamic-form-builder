import { useState } from "react";
import Icon from "../../ui/Icon";
import { useCurrentSchemaContext } from "../InputCard";

const ValidationRules = ({ validationRules, setFormData }) => {
    
    const { schema : { availableRules } } = useCurrentSchemaContext();

    const [rule, setRule] = useState("")
    const [value, setValue] = useState(undefined)
    const [error, setError] = useState("")
    const [isEditing, setIsEditing] = useState(false);

    const getRuleValue = (rule) => {
        return validationRules?.find(currRule => currRule.type === rule)?.value
    }

    const handleAddRule = (e) => {
        e.preventDefault();

        if (!rule) return setError("Please Select Rule");
        if (!value) return setError("Please Select Value");
        if (rule === "max" && value < getRuleValue("min")) return setError("max value can not be less than min");
        if (rule === "min" && value > getRuleValue("max")) return setError("min value can not be grater than max");
        if (rule === "maxLength" && value < getRuleValue("minLength")) return setError("maxLength value can not be garter than minLength");
        if (rule === "minLength" && value > getRuleValue("maxLength")) return setError("minLength value can not be less than maxLength");
        
        const existingRule = validationRules.find(currRule => currRule.type === rule);
        
        if (isEditing || existingRule) {
            const updatedRules = validationRules.map(currRule => {
                if (currRule.type === rule) {
                    return { type: rule, value: value }
                } else {
                    return currRule;
                }
            })
            setFormData(prev => { return { ...prev, validationRules: updatedRules } })
        } else {
            setFormData(prev => { return { ...prev, validationRules: [...validationRules, { type: rule, value: value }] } })
        }

        setRule("")
        setValue("")
        setError("")
        setIsEditing(false)
    }

    const removeRule = (type) => {
        const updatedRules = validationRules.filter(rule => rule.type !== type)
        setFormData(prev => { return { ...prev, validationRules: updatedRules } })
    }

    const editRule = (e, type) => {
        e.preventDefault();
        setRule(type)
        setValue(getRuleValue(type));
        setIsEditing(true);
    }

    const handleChange = (e) => {
        const updatedRules = validationRules.map(rule => {
            if (rule.type === "required") {
                return { ...rule, value: e.target.checked }
            } else {
                return rule;
            }
        })
        setFormData(prev => { return { ...prev, validationRules: updatedRules } })
    }

    return (
        <>
            <div className="mt-1 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-base font-semibold text-slate-800">Validation Rules</div>

                <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                    <div className="grid grid-cols-3 bg-slate-100 text-xs font-extrabold uppercase tracking-wide text-slate-600">
                        <div className="p-2 text-center">Rule</div>
                        <div className="p-2 text-center">Value</div>
                        <div className="p-2 text-center">Action</div>
                    </div>
                    {validationRules.map(rule => {
                        console.log(rule);
                        return (
                            <div className="grid h-10 grid-cols-3 font-semibold" key={rule.type}>
                                <div className="border-t border-slate-200 p-2 text-center text-sm capitalize text-slate-700"><span>{rule.type}</span></div>
                                <div className="border-t border-slate-200 p-2 text-center text-sm text-slate-700">{rule?.value?.toString()}</div>
                                <div className="border-t border-slate-200 p-2 gap-5">
                                    {rule.type !== "required" &&
                                        <>
                                            <Icon icon="edit" onClick={(e) => editRule(e, rule.type)} />
                                            <Icon icon="delete" onClick={(e) => removeRule(e, rule.type)} />
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-white p-3">
                    <input
                        type="checkbox"
                        className="h-4 w-4 accent-indigo-600"
                        checked={getRuleValue("required")}
                        onChange={handleChange}
                    />
                    <label htmlFor="" className="text-sm font-medium text-slate-700">Required</label>
                </div>

                <div className="mt-1 grid grid-cols-1 gap-3 md:grid-cols-[3fr_3fr_1fr] md:gap-4">


                    <select
                        disabled={isEditing}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                        name="rule"
                        value={rule}
                        onChange={(e) => {
                            setRule(e.target.value)
                        }}
                    >
                        <option value="">Select Rule</option>
                        {availableRules.map(rule => {
                            return <option key={rule} value={rule}>{rule}</option>
                        })}
                    </select>

                    <input
                        placeholder={`${!rule ? "First select rule for defining it's value" : ""} ${rule === "pattern" ? `e.g., ${String(/^\+?\d{10,15}$/)}` : ""}`}
                        disabled={!rule}
                        name="value"
                        value={value}
                        onChange={e =>
                            setValue(rule !== "pattern" ? Number(e.target.value) : e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                        type={rule === "pattern" ? "text" : "number"}
                    />

                    <button onClick={handleAddRule} className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"> {isEditing ? "Edit" : "Add"}</button>
                </div>
                {error && <p className="text-sm pl-3 text-red-500 -mt-2"> * {error}</p>}
            </div>
        </>
    )
}

export default ValidationRules;