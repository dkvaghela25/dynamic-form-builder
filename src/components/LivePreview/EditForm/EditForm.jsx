import { useContext, useState } from "react";
import { FormSchemaContext } from "../../../contexts/formSchemaContext";
import { useFormContext } from "react-hook-form";
import ValidationRules from "./ValidationRules";
import { useCurrentSchemaContext } from "../InputCard";

const EditForm = () => {

    const { schema, setEditMode, index } = useCurrentSchemaContext();

    const { unregister, setValue } = useFormContext();
    const { setFormSchema } = useContext(FormSchemaContext)
    const [formData, setFormData] = useState(schema)

    console.log(formData);

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

export default EditForm;
