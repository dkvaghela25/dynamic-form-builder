import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";
import { getRuleValue } from "../../../utils/getRuleValue";

const DatePicker = ({ field, error, handleChange }) => {

    const { schema } = useCurrentSchemaContext();

    const { type, placeholder, value, validationRules } = schema;

    return (
        <>
            <input
                {...field}
                required={validationRules.required}
                className={`w-full ${type === "color" ? "h-12 p-1! cursor-pointer rounded-sm!" : ""} rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
                type={type}
                value={value}
                error={error}
                onChange={handleChange}
                placeholder={placeholder}
                min={getRuleValue(validationRules, type === "date" ? "minDate" : "minDateTime")}
                max={getRuleValue(validationRules, type === "date" ? "maxDate" : "maxDateTime")}
            />
        </>
    );
};

export default DatePicker;