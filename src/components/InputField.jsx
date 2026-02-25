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
        <div className="flex flex-col gap-1 bg-gray-100 p-5 rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            {editMode
                ? <EditSchema schema={schema} index={index} setEditMode={setEditMode} />
                : <>
                    <div className="flex ml-auto gap-2">
                        <FaEdit className="w-6 h-6 cursor-pointer text-green-500" onClick={editSchema} />
                        <MdDelete className="w-6 h-6 cursor-pointer text-red-500" onClick={deleteSchema} />
                    </div>
                    <label htmlFor="">{schema.label}</label>
                    <Controller
                        control={control}
                        name={schema.name}
                        rules={schema.rules}
                        render={({ field }) => (
                            <input
                                {...field}
                                className="border rounded p-2 bg-white"
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