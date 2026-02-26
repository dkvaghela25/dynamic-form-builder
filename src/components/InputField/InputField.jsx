import { useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FormSchemaContext } from "../../contexts/formSchemaContext";
import { validateForm } from "../../utils/validateForm";
import Icon from "../ui/Icon";
import TextInput from "./TextInput";

const InputField = ({ schema, setEditMode, index }) => {

    const { control, unregister } = useFormContext();
    const { setFormSchema } = useContext(FormSchemaContext);

    const deleteSchema = () => {
        unregister(schema.name)
        setFormSchema(prev => prev.filter((currElem, currIndex) => currIndex !== index));
    }

    const editSchema = () => {
        setEditMode(true);
    }

    return (
        <div className="flex flex-col">
            <div className="mb-2 flex justify-end gap-2">
                <Icon icon="edit" onClick={editSchema} />
                <Icon icon="delete" onClick={deleteSchema} />
            </div>

            <Controller
                control={control}
                name={schema.name}
                rules={validateForm(schema.label, schema.validationRules)}
                render={({ field, fieldState: { error } }) => (
                    <div className="relative flex flex-col">
                        <label htmlFor="" className="mb-1 font-medium text-slate-700">
                            <span>{schema.label || "Untitled field"}</span>
                            {schema.validationRules.find(rule => rule.type === "required").value && <span className="text-red-500"> *</span>}
                        </label>
                        <TextInput field={field} schema={schema} error={error} index={index} />
                        {schema.type === "password" && <button className="absolute top-3 right-3"><FaEye className="w-6 h-6" /></button>}
                        {error && <p className="text-red-500 text-sm mt-1">* {error.message}</p>}
                    </div>
                )}
            />
        </div>
    );
};

export default InputField;