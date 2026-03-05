
import { Controller, useFormContext } from "react-hook-form";
import useCustomRules from "../../../hooks/useCustomRules";
import { renderInputComponent } from "../../../utils/renderInputComponent";
import { CurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";
import { useSetFormSchema } from "../../../contexts/formSchemaContext";

const InputField = ({ schema, index }) => {

    const value = {
        schema,
        index
    }

    const setFormSchema = useSetFormSchema();


    const { name, type, label, validationRules } = schema;

    const { control } = useFormContext();
    const finalRules = useCustomRules(label, validationRules);

    return (
        <CurrentSchemaContext.Provider value={value}>

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
                        {renderInputComponent(field, error, index, type, setFormSchema)}
                        {error && <p className="text-red-500 text-sm mt-1">* {error.message}</p>}
                    </div>
                )}
            />

        </CurrentSchemaContext.Provider>
    );
};

export default InputField;

