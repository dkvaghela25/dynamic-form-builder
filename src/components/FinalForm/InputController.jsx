import { Controller, useFormContext } from "react-hook-form";
import useCustomRules from "../../hooks/useCustomRules";

const InputController = ({ schema }) => {

    const { type, name, label, validationRules } = schema;
    const { control } = useFormContext();
    const finalRules = useCustomRules(type, label, validationRules);

    const renderFinalInputComponent = () => {

    }

    return (
        <Controller
            control={control}
            name={name}
            rules={finalRules}
            render={({ field }) => renderFinalInputComponent(field) }
        />
    );
};

export default InputController;