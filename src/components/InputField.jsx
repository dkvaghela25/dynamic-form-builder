import { Fragment, useContext, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FormSchemaContext } from "../contexts/formSchemaContext";
import EditSchema from "./EditSchema";

const InputField = ({ schema, index }) => {
    const { control, trigger, formState: { errors } } = useFormContext();
    const { setFormSchema } = useContext(FormSchemaContext);
    const [editMode, setEditMode] = useState(false);

    console.log(schema);

    const deleteSchema = () => {
        setFormSchema(prev => prev.filter((currElem, currIndex) => currIndex !== index));
    }

    const editSchema = () => {
        setEditMode(true);
    }

    const handleChange = (e) => {
        setFormSchema(prev => {
            return prev.map((currElem, currIndex) => {
                if (currIndex === index) {
                    return { ...currElem, value: e.target.value }
                } else {
                    return currElem;
                }
            })
        })
    }

    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", errors);

    return (
        <div className="rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm">
            {editMode
                ? <EditSchema schema={schema} index={index} setEditMode={setEditMode} />
                : <div className="flex flex-col">
                    <div className="mb-2 flex justify-end gap-2">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-emerald-600 cursor-pointer hover:bg-emerald-50" onClick={editSchema}>
                            <FaEdit className="h-4 w-4" />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-rose-600 cursor-pointer hover:bg-rose-50" onClick={deleteSchema}>
                            <MdDelete className="h-4 w-4" />
                        </button>
                    </div>
                    <label htmlFor="" className="mb-1 font-medium text-slate-700">
                        <span>{schema.label || "Untitled field"}</span>
                        {schema.validationRules.required && <span className="text-red-500"> *</span>}
                    </label>
                    <Controller
                        control={control}
                        name={schema.name}
                        rules={schema.validationRules}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <input
                                    required={schema.validationRules.required}
                                    {...field}
                                    className={`"w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 ${error ? "border-red-400" : ""}`}
                                    type={schema.type}
                                    value={schema.value}
                                    error={error}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleChange(e);
                                    }}
                                    onBlur={(e) => {
                                        field.onBlur(e);
                                        trigger(schema.name);
                                    }}
                                    placeholder={schema.placeholder}
                                />
                                {error && <p>{error.message}</p>}
                            </>
                        )}
                    />
                </div>
            }
        </div>
    );
};

export default InputField;