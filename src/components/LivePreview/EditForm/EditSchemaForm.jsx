import { Fragment, useState } from "react";
import { useFormContext } from "react-hook-form";
import ValidationRules from "./ValidationRules";
import { useCurrentSchemaContext } from "../InputCard";
import { useSetFormSchema } from "../../../contexts/formSchemaContext";

const EditSchemaForm = () => {

    const { schema, setEditMode, index } = useCurrentSchemaContext();

    const { unregister, setValue } = useFormContext();
    const [formData, setFormData] = useState(schema)
    const setFormSchema = useSetFormSchema();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "type") {

            const availableRules = (() => {
                switch (value) {
                    case "text": return ["minLength", "maxLength", "pattern"];
                    case "number": return ["min", "max"];
                    case "password": return ["minLength", "maxLength", "pattern"];
                    case "email": return ["pattern"];
                    case "color": {
                        setFormData(prev => { return { ...prev, "value": "#000000" } })
                        return []
                    };
                }
            })();

            setFormData(prev => { return { ...prev, availableRules } })
        }

        setFormData(prev => { return { ...prev, [name]: value } })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if ((schema.name !== formData.name)) {
            unregister(schema.name);
            setValue(formData.name, schema.value);
        }

        if ((schema.value !== formData.value)) {
            setValue(schema.name, formData.value);
        }

        setFormSchema(prev => {
            return prev.map((currElem, currIndex) => {
                if (currIndex === index) {
                    return formData;
                } else {
                    return currElem;
                }
            })
        })

        setEditMode(false);
    }

    return (
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4">

            <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm font-medium capitalize text-slate-700">Input Type</label>
                <select
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="text">text</option>
                    <option value="number">number</option>
                    <option value="password">password</option>
                    <option value="email">email</option>
                    <option value="color">color</option>
                </select>
            </div>


            {Object.entries(formData).map(([key, value]) => {
                return (
                    <Fragment key={key}>
                        {!(["type", "validationRules", "availableRules"].includes(key)) &&
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className="text-sm font-medium capitalize text-slate-700">{key}</label>
                                <input
                                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    type="text"
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                />
                            </div>
                        }
                    </Fragment>
                )
            })}

            <ValidationRules availableRules={formData.availableRules} validationRules={formData.validationRules} setFormData={setFormData} />

            <div className="ml-auto mt-2 flex gap-3">
                <button className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" onClick={() => setEditMode(false)}>Cancel</button>
                <button className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700" onClick={handleFormSubmit}>Edit Schema</button>
            </div>
        </div>
    );
};

export default EditSchemaForm;
