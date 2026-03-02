import { Controller, useFormContext } from "react-hook-form";
import { useSetFormSchema } from "../../../contexts/formSchemaContext";
import Icon from "../../ui/Icon";
import useCustomRules from "../../../hooks/useCustomRules";
import { useCurrentSchemaContext } from "../InputCard";
import TextInput from "./TextInput";

const InputPreview = () => {

    const { schema, setEditMode, index } = useCurrentSchemaContext();
    const { control, unregister } = useFormContext();
   const setFormSchema = useSetFormSchema();

   const finalRules = useCustomRules(schema.label, schema.validationRules);

    const removeSchema = (e) => {
        e.preventDefault();
        unregister(schema.name)
        setFormSchema(prev => prev.filter((currElem, currIndex) => currIndex !== index));
    }

    const editSchema = (e) => {
        e.preventDefault();
        setEditMode(true);
    }

    const renderInputComponent = (field,error) => {

        switch(schema.type) {
            case "text":
            case "number":
            case "password":
            case "email": return <TextInput field={field} error={error} />;

            default: return <div></div>
        }

    }

    return (
        <div className="flex flex-col">
            <div className="mb-2 flex justify-between gap-2 border-b border-b-slate-300 pb-3">
                <div className="font-medium text-[18px] text-slate-700">Input Type : {schema.type}</div>
                <div className="flex gap-2">
                    <Icon icon="edit" helperText="Edit Schema" onClick={editSchema} />
                    <Icon icon="delete" helperText="Remove Schema" onClick={removeSchema} />
                </div>
            </div>

            <Controller
                control={control}
                name={schema.name}
                rules={finalRules}
                render={({ field, fieldState: { error } }) => (
                    <div className="relative flex flex-col">
                        <label htmlFor="" className="mb-1 font-medium text-slate-700">
                            <span>{schema.label || "Untitled field"}</span>
                            {schema.validationRules.find(rule => rule.type === "required").value && <span className="text-red-500"> *</span>}
                        </label>
                        {renderInputComponent(field, error)}
                        {error && <p className="text-red-500 text-sm mt-1">* {error.message}</p>}
                    </div>
                )}
            />
        </div>
    );
};

export default InputPreview;