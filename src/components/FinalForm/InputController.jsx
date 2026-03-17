import { Controller, useFormContext } from "react-hook-form";
import useCustomRules from "../../hooks/useCustomRules";
import ComponentSwitch from "./ComponentSwitch";
import { getRuleValue } from "../../utils/getRuleValue";

const InputController = ({ schema }) => {
    const { id, type, name, label, validationRules } = schema;
    const { control } = useFormContext();
    const finalRules = useCustomRules(type, label, validationRules);

    return (
        <Controller
            control={control}
            name={name}
            rules={finalRules}
            render={({ field, fieldState: { error } }) => (
                <div className="flex flex-col gap-1.5 w-full">
                    <label
                        className="text-sm font-medium text-(--secondary-text) flex items-center gap-1"
                        htmlFor={id}
                    >
                        {label}
                        {getRuleValue(validationRules, "required") && (
                            <span className="text-(--destructive) text-xs" title="Required field">*</span>
                        )}
                    </label>

                    <ComponentSwitch field={field} error={error} schema={schema} />

                    <div className={`grid transition-all duration-300 ease-in-out ${error ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"}`}>
                        <p className="overflow-hidden -mt-1 text-(--input-error-border-color) text-[13px]">
                            * {error?.message}
                        </p>
                    </div>
                </div>
            )}
        />
    );
};

export default InputController;