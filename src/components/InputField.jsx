import { useContext, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FormSchemaContext } from "../contexts/formSchemaContext";
import EditSchema from "./EditSchema";

const InputField = ({ schema, index }) => {
    const { control } = useFormContext();
    const { setFormSchema } = useContext(FormSchemaContext);
    const [editMode, setEditMode] = useState(false);

    const deleteSchema = () => {
        setFormSchema(prev => prev.filter((currElem, currIndex) => currIndex !== index));
    }

    const editSchema = () => {
        setEditMode(true);
    }

    const handleChange = (e) => {
        setFormSchema(prev => {
            console.log(e.target.value);
            return prev.map((currElem, currIndex) => {
                if (currIndex === index) {
                    return { ...currElem, value: e.target.value }
                } else {
                    return currElem;
                }
            })
        })
    }

    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm md:p-5">
            {editMode
                ? <EditSchema schema={schema} index={index} setEditMode={setEditMode} />
                : <>
                    <div className="mb-2 flex justify-end gap-2">
                        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-emerald-600 transition hover:bg-emerald-50" onClick={editSchema}>
                            <FaEdit className="h-4 w-4" />
                        </button>
                        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-rose-600 transition hover:bg-rose-50" onClick={deleteSchema}>
                            <MdDelete className="h-4 w-4" />
                        </button>
                    </div>
                    <label htmlFor="" className="mb-1 text-sm font-medium text-slate-700">{schema.label || "Untitled field"}</label>
                    <Controller
                        control={control}
                        name={schema.name}
                        rules={schema.rules}
                        render={({ field }) => (
                            <input
                                {...field}
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                type={schema.type}
                                value={schema.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    handleChange(e);
                                }}
                                placeholder={schema.placeholder}
                            />
                        )}
                    />
                </>
            }
        </div>
    );
};

export default InputField;