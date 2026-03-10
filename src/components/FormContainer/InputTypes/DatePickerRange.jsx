import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";

const DatePickerRange = ({ field, error, handleChange }) => {

    const { schema } = useCurrentSchemaContext();

    const { type, placeholder, startDate, endDate, validationRules } = schema;

    return (
        <div className="flex gap-3">
            <input
                {...field}
                required={validationRules.required}
                className={`w-full ${type === "color" ? "h-12 p-1! cursor-pointer rounded-sm!" : ""} rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
                type="date"
                name="startDate"
                value={startDate}
                error={error}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <input
                {...field}
                required={validationRules.required}
                className={`w-full ${type === "color" ? "h-12 p-1! cursor-pointer rounded-sm!" : ""} rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
                type="date"
                name="endDate"
                value={endDate}
                error={error}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default DatePickerRange;