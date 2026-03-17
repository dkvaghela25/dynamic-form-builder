import { Fragment, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useCurrentSchemaContext } from "../../../../../contexts/CurrentSchemaContext";
import { useSetFormSchema } from "../../../../../contexts/formSchemaContext";
import { hiddenAttributes } from "../../../../../constants";
import Value from "./EditSchemaFormComponents/Value";
import Accept from "./EditSchemaFormComponents/Accept";
import Type from "./EditSchemaFormComponents/Type";
import ValidationRules from "./EditSchemaFormComponents/ValidationRules";
import OptionsEditor from "./EditSchemaFormComponents/OptionsEditor";

const EditSchemaForm = () => {

    const setFormSchema = useSetFormSchema();
    const { schema, setEditMode, index } = useCurrentSchemaContext();
    const { unregister, setValue } = useFormContext();

    const [formData, setFormData] = useState(schema);
    const [displayId, setDisplayId] = useState(false);

    const handleToggle = (id) => {
        displayId !== id ? setDisplayId(id) : setDisplayId(false);
    }

    const updateFormData = (obj) => {
        const isSyntheticEvent = obj && !!obj.nativeEvent && typeof obj.persist === 'function';
        if (isSyntheticEvent) {
            const { name, value } = obj.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(obj);
        }
    };


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
        <div className="flex flex-col gap-3 mt-4 rounded-xl border border-slate-200 bg-white p-4">

            <Type
                formData={formData}
                updateFormData={updateFormData}
            />

            {Object.entries(formData).map(([key, value]) => {
                return (
                    <Fragment key={key}>
                        {!hiddenAttributes.includes(key) &&
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className="text-sm font-medium capitalize text-slate-700">{key}</label>
                                <input
                                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    type={["step", "min", "max"].includes(key) ? "number" : "text"}
                                    name={key}
                                    value={value}
                                    onChange={updateFormData}
                                />
                            </div>
                        }
                    </Fragment>
                )
            })}

            <Value
                formData={formData}
                updateFormData={updateFormData}
            />

            <Accept
                formData={formData}
                updateFormData={updateFormData}
            />

            {<OptionsEditor
                displayId={displayId}
                handleToggle={handleToggle}
                options={formData.options}
                setFormData={setFormData}
            />}

            <ValidationRules
                displayId={displayId}
                handleToggle={handleToggle}
                availableRules={formData.availableRules}
                validationRules={formData.validationRules}
                setFormData={setFormData}
            />

            <div className="ml-auto mt-2 flex gap-3">
                <button
                    onClick={() => setEditMode(false)}
                    className="cursor-pointer rounded-sm border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    Cancel
                </button>

                <button
                    className="cursor-pointer rounded-sm bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    onClick={handleFormSubmit}
                >
                    Edit Schema
                </button>
            </div>
        </div>
    );
};

export default EditSchemaForm;
