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
                <div className="flex flex-col gap-1">
                    <label className="text-(--muted-foreground)" htmlFor={id}>{label} {getRuleValue(validationRules, "required") && <span className="text-(--destructive)">*</span>} </label>
                    <ComponentSwitch field={field} error={error} schema={schema} />
                    {error && <p>{error.message}</p>}
                </div>
            )}
        />
    );
};

export default InputController;