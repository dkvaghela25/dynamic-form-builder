import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";
import { useSetFormSchema } from "../../../contexts/formSchemaContext";

const DatePickerRange = ({ field, error }) => {

    const { schema, index } = useCurrentSchemaContext();
    const setFormSchema = useSetFormSchema();

    const { type, placeholder, value : currSchemaValue, validationRules } = schema;
    const {startDate, endDate} = currSchemaValue

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = { ...currSchemaValue, [name]: value }
        setFormSchema(prev => {
            return prev.map((currElem, currIndex) => {
                if (currIndex === index) {
                    return { ...currElem, value: newValue }
                } else {
                    return currElem;
                }
            })
        })
        field.onChange(newValue)
    }

    return (
        <div className="flex gap-3">
            <input
                {...field}
                required={validationRules.required}
                className={`w-full ${type === "color" ? "h-12 p-1! cursor-pointer rounded-sm!" : ""} rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
                type="date"
                name={`startDate`}
                value={startDate}
                error={error}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <input
                {...field}
                disabled={!startDate}
                required={validationRules.required}
                className={`w-full ${type === "color" ? "h-12 p-1! cursor-pointer rounded-sm!" : ""} rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100`}
                type="date"
                name={`endDate`}
                value={endDate}
                error={error}
                onChange={handleChange}
                placeholder={placeholder}
                min={startDate}
            />
        </div>
    );
};

export default DatePickerRange;