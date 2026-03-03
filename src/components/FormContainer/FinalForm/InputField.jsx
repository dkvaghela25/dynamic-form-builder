
import { Controller, useFormContext } from "react-hook-form";
import useCustomRules from "../../../hooks/useCustomRules";
import { renderInputComponent } from "../../../utils/renderInputComponent";
import { CurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";

const InputField = ({ schema, index }) => {

    const value = {
        schema,
        index
    }

    const { control } = useFormContext();
    const finalRules = useCustomRules(schema.label, schema.validationRules);


    return (
        <CurrentSchemaContext.Provider value={value}>

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
                        {renderInputComponent(field, error, schema.type)}
                        {error && <p className="text-red-500 text-sm mt-1">* {error.message}</p>}
                    </div>
                )}
            />

        </CurrentSchemaContext.Provider>
    );
};

export default InputField;

