import { Fragment, useState } from "react";
import { useFormContext } from "react-hook-form";
import ValidationRules from "./ValidationRules";
import OptionsEditor from "./OptionsEditor";
import { useCurrentSchemaContext } from "../../../../contexts/CurrentSchemaContext";
import { useSetFormSchema } from "../../../../contexts/formSchemaContext";
import { datePickerTypes, fileTypes, hiddenAttributes, textInputs } from "../../../../constants";
import Select from "../../../ui/Select";

const EditSchemaForm = () => {

    const setFormSchema = useSetFormSchema();
    const { schema, setEditMode, index } = useCurrentSchemaContext();
    const { unregister, setValue } = useFormContext();

    const [formData, setFormData] = useState(schema);
    const [displayId, setDisplayId] = useState(false);

    const handleToggle = (id) => {
        displayId !== id ? setDisplayId(id) : setDisplayId(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "type") {

            let newValue = "";

            const availableRules = (() => {
                switch (value) {
                    case "text": return ["minLength", "maxLength", "pattern"];
                    case "number": return ["min", "max"];
                    case "password": return ["minLength", "maxLength", "pattern"];
                    case "email": return ["pattern"];
                    case "color": return [];
                    case "date": return ["minDate", "maxDate"];
                    case "datetime-local": return ["minDateTime", "maxDateTime"];
                    case "date-range": return [];
                }
            })();

            setFormData(prev => {
                return {
                    ...prev,
                    value: newValue,
                    validationRules: [{ "type": "required", "value": false }],
                    availableRules
                }
            })
        }

        setFormData(prev => { return { ...prev, [name]: value } })
    }

    const fileSelectChange = (e) => {
        console.log(e.target.selectedOptions);
        const value = Array.from(e.target.selectedOptions, (option) => option?.value);
        setFormData(prev => { return { ...prev, "accept": value } })
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
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4">


            {textInputs.includes(formData.type) &&
                <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-sm font-medium capitalize text-slate-700">Input Type</label>
                    <Select
                        name="type"
                        value={formData.type}
                        placeholder="Select Input Type"
                        options={textInputs}
                        handleChange={handleChange}
                        multiple={false}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />
                </div>
            }

            {datePickerTypes.includes(formData.type) &&
                <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-sm font-medium capitalize text-slate-700">Input Type</label>
                    <Select
                        name="type"
                        value={formData.type}
                        placeholder="Select Input Type"
                        options={datePickerTypes}
                        handleChange={handleChange}
                        multiple={false}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />
                </div>
            }

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
                                    onChange={handleChange}
                                />
                            </div>
                        }
                    </Fragment>
                )
            })}

            {(!formData.options && !(["file", "switch"].includes(formData.type))) && <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm font-medium capitalize text-slate-700">Value</label>
                <div className="flex items-center gap-3">
                    <input
                        className={`w-full ${formData.type === "range" ? "my-2 p-0!" : ""} ${formData.type === "color" ? "h-12 p-0.5! rounded!" : ""} rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
                        type={formData.type !== "password" ? formData.type : "text"}
                        name={"value"}
                        value={formData.value}
                        onChange={handleChange}
                    />
                    {formData.type === "range" && <span className="text-[20px] font-semibold">{formData.value}</span>}
                </div>
            </div>}

            {formData.type === "file" && <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-sm font-medium capitalize text-slate-700">Accept</label>
                <Select
                    name="accept"
                    value={formData.accept}
                    placeholder="Select File Type"
                    options={fileTypes}
                    handleChange={fileSelectChange}
                    multiple={true}
                />
            </div>}

            {formData.options && <OptionsEditor displayId={displayId} handleToggle={handleToggle} options={formData.options} setFormData={setFormData} />}

            {formData.validationRules && <ValidationRules displayId={displayId} handleToggle={handleToggle} availableRules={formData.availableRules} validationRules={formData.validationRules} setFormData={setFormData} />}

            <div className="ml-auto mt-2 flex gap-3">
                <button className="cursor-pointer rounded-sm border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" onClick={() => setEditMode(false)}>Cancel</button>
                <button className="cursor-pointer rounded-sm bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700" onClick={handleFormSubmit}>Edit Schema</button>
            </div>
        </div>
    );
};

export default EditSchemaForm;
