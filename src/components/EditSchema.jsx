import { useContext, useState } from "react";
import { FormSchemaContext } from "../contexts/formSchemaContext";
import { useFormContext } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { Fragment } from "react";
import { FaEdit } from "react-icons/fa";

const EditSchema = ({ schema, index, setEditMode }) => {

    const { unregister, setValue } = useFormContext();
    const { setFormSchema } = useContext(FormSchemaContext)
    const [formData, setFormData] = useState({
        type: schema.type,
        label: schema.label,
        placeholder: schema.placeholder,
        name: schema.name,
        value: schema.value,
        validationRules: schema.validationRules
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => { return { ...prev, [name]: value } })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setFormSchema(prev => {
            return prev.map((currElem, currIndex) => {
                if (currIndex === index) {
                    return formData;
                } else {
                    return currElem;
                }
            })
        })

        if (schema.name !== formData.name) {
            unregister(schema.name);
            setValue(formData.name, schema.value);
        }

        setEditMode(false);
    }

    return (
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4">

            {Object.entries(formData).map(([key, value]) => {
                return (
                    <div className="flex flex-col gap-1" key={key}>
                        {(key !== "type" && key !== "validationRules") &&
                            <>
                                <label htmlFor="" className="text-sm font-medium capitalize text-slate-700">{key}</label>
                                <input
                                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    type="text"
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                />
                            </>
                        }
                    </div>
                )
            })}

            <ValidationRules validationRules={formData.validationRules} setFormData={setFormData} />

            <div className="ml-auto mt-2 flex gap-3">
                <button className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" onClick={() => setEditMode(false)}>Cancel</button>
                <button className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700" onClick={handleFormSubmit}>Edit Schema</button>
            </div>
        </div>
    );
};

export default EditSchema;

const ValidationRules = ({ validationRules, setFormData }) => {

    const [rule, setRule] = useState("")
    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const [isEditing, setIsEditing] = useState(false);

    let availableRules = ["min", "max", "minLength", "maxLength", "pattern"];
    // availableRules = availableRules.filter(rule => !(Object.keys(validationRules).includes(rule)));

    const addRule = (e) => {
        e.preventDefault();

        if (!rule) return setError("Please Select Rule");
        if (!value) return setError("Please Select Value");
        if (rule === "max" &&  value < validationRules["min"]) return setError("max value can not be less than min");
        if (rule === "min" &&  value > validationRules["max"]) return setError("min value can not be grater than max");
        if (rule === "maxLength" &&  value < validationRules["minLength"]) return setError("maxLength value can not be garter than minLength");
        if (rule === "minLength" &&  value > validationRules["maxLength"]) return setError("minLength value can not be less than maxLength");


        setFormData(prev => { return { ...prev, validationRules: [ ...validationRules, { type : rule, value : value } ] } })
        setRule("")
        setValue("")
        setError("")
        setIsEditing(false)
    }

    const removeRule = (type) => {
        const updatedRules = validationRules.filter(rule => rule.type !== type)
        setFormData(prev => { return { ...prev, validationRules: updatedRules } })
    }

    const editRule = (type) => {
        setRule(type)
        setValue(validationRules[type])
        setIsEditing(true);
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
                        return (
                            <div className="grid grid-cols-3 font-semibold" key={rule.type}>
                                <div className="border-t border-slate-200 p-2 text-center text-sm capitalize text-slate-700">{rule.type}</div>
                                <div className="border-t border-slate-200 p-2 text-center text-sm text-slate-700">{rule.value.toString()}</div>
                                <div className="flex gap-5 items-center justify-center border-t border-slate-200 p-2">
                                    {rule.type !== "required" &&
                                        <>
                                            <FaEdit className="h-5 w-5 cursor-pointer text-emerald-500 transition hover:text-emerald-700" onClick={() => editRule(rule.type)} />
                                            <MdDelete className="h-5 w-5 cursor-pointer text-red-500 transition hover:text-rose-700" onClick={() => removeRule(rule.type)} />
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
                        checked={validationRules.find(rule => rule.type === "required").value}
                        onChange={(e) => {
                            const updatedRules = validationRules.map(rule => {
                                if(rule.type === "required"){
                                    return { ...rule, value : e.target.checked }
                                } else {
                                    return rule;
                                }
                            })
                            setFormData(prev => { return { ...prev, validationRules: updatedRules } })
                        }}
                    />
                    <label htmlFor="" className="text-sm font-medium text-slate-700">Required</label>
                </div>

                <div className="mt-1 grid grid-cols-1 gap-3 md:grid-cols-[3fr_3fr_1fr] md:gap-4">


                    <select
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
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
                        placeholder="Value (First select rule for defining it's value)"
                        disabled={!rule}
                        name="value"
                        onChange={e =>
                            setValue(rule !== "pattern" ? Number(e.target.value) : e.target.value)
                        }
                        value={value}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                        type={rule === "pattern" ? "text" : "number"}
                    />

                    <button onClick={addRule} className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"> {isEditing ? "Edit" : "Add"}</button>
                </div>
                {error && <p className="text-sm pl-3 text-red-500 -mt-2"> * {error}</p>}
            </div>
        </>
    )
}