import { Controller, useFormContext } from "react-hook-form";
import { useSetFormSchema } from "../../../../../contexts/formSchemaContext";
import useCustomRules from "../../../../../hooks/useCustomRules";
import { useCurrentSchemaContext } from "../../../../../contexts/CurrentSchemaContext";
import { renderInputComponent } from "../../../../../utils/renderInputComponent";

const InputPreview = () => {

    const { schema, index } = useCurrentSchemaContext();
    const { control } = useFormContext();
    const setFormSchema = useSetFormSchema();

    const { name, type, label, validationRules } = schema;

    const finalRules = useCustomRules(type, label, validationRules);

    return (
        <div className="flex flex-col">

            <Controller
                control={control}
                name={name}
                rules={finalRules}
                render={({ field, fieldState: { error } }) => (
                    <div className="relative flex flex-col">
                        <label htmlFor="" className="mb-1 font-medium text-slate-700">
                            <span>{label || "Untitled field"}</span>
                            {validationRules?.find(rule => rule.type === "required").value && <span className="text-red-500"> *</span>}
                        </label>
                        {renderInputComponent(field, error, index, type, setFormSchema)}
                        {(error && !(["date-range", "file"].includes(type))) && <p className="text-red-500 text-sm mt-1">* {error.message}</p>}
                    </div>
                )}
            />
        </div>
    );
};

export default InputPreview;