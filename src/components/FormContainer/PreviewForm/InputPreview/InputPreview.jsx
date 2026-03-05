import { useCallback, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSetFormSchema } from "../../../../contexts/formSchemaContext";
import useCustomRules from "../../../../hooks/useCustomRules";
import { useCurrentSchemaContext } from "../../../../contexts/CurrentSchemaContext";
import { renderInputComponent } from "../../../../utils/renderInputComponent";
import Title from "./Title";

const InputPreview = () => {

    const { schema, setEditMode, index } = useCurrentSchemaContext();
    const { control, unregister } = useFormContext();
    const setFormSchema = useSetFormSchema();

    const { name, type, label, validationRules } = schema;

    const finalRules = useCustomRules(label, validationRules);

    const inputType = useMemo(() => type, [type])

    const removeSchema = useCallback((e) => {
        e.preventDefault();
        unregister(name)
        setFormSchema(prev => prev.filter((currElem, currIndex) => currIndex !== index));
    }, [setFormSchema, unregister, index, name])

    const editSchema = useCallback((e) => {
        e.preventDefault();
        setEditMode(true);
    }, [setEditMode])

    return (
        <div className="flex flex-col">
            <div className="mb-2 flex justify-between items-center gap-2 border-b border-b-slate-300 pb-3">
                <Title type={inputType} editSchema={editSchema} removeSchema={removeSchema} />
            </div>

            <Controller
                control={control}
                name={name}
                rules={finalRules}
                render={({ field, fieldState: { error } }) => (
                    <div className="relative flex flex-col">
                        <label htmlFor="" className="mb-1 font-medium text-slate-700">
                            <span>{label || "Untitled field"}</span>
                            {validationRules.find(rule => rule.type === "required").value && <span className="text-red-500"> *</span>}
                        </label>
                        {renderInputComponent(field, error, type)}
                        {error && <p className="text-red-500 text-sm mt-1">* {error.message}</p>}
                    </div>
                )}
            />
        </div>
    );
};

export default InputPreview;