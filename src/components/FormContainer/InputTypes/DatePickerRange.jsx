import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";
import { useSetFormSchema } from "../../../contexts/formSchemaContext";
import { getRuleValue } from "../../../utils/getRuleValue";

const DatePickerRange = ({ field, error }) => {

    const { schema, index } = useCurrentSchemaContext();
    const setFormSchema = useSetFormSchema();

    const { placeholder, value: currSchemaValue, validationRules } = schema;
    const { startDate, endDate } = currSchemaValue

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

    const getMaxEndDate = () => { 
        const startDateInMilliseconds = new Date(startDate).getTime();
        const additionalMilliseconds = 1000 * 60 * 60 * 24 * getRuleValue(validationRules, "dateRange");
        return new Date(startDateInMilliseconds + additionalMilliseconds).toISOString().slice(0, 10);
    }

    return (
        <div className="flex gap-3">
            <div className="w-[50%]">
                <input
                    {...field}
                    required={validationRules.required}
                    className={`w-full rounded-xl  border ${error && error.message.startsWith("Start") ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
                    type="date"
                    name={`startDate`}
                    value={startDate}
                    error={error && error.message.startsWith("Start")}
                    onChange={handleChange}
                    placeholder={placeholder}
                    min={getRuleValue(validationRules, "minStartDate")}
                    max={getRuleValue(validationRules, "maxStartDate")}
                />
                {(error && error.message.startsWith("Start")) && <p className="text-red-500 text-sm mt-1">* {error.message}</p>}
            </div>
            <div className="w-[50%]">
                <input
                    {...field}
                    disabled={!startDate}
                    required={validationRules.required}
                    className={`w-full rounded-xl border ${error && error.message.startsWith("End") ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100`}
                    type="date"
                    name={`endDate`}
                    value={endDate}
                    error={error && error.message.startsWith("End")}
                    onChange={handleChange}
                    placeholder={placeholder}
                    min={startDate}
                    max={getMaxEndDate()}
                />
                {(error && error.message.startsWith("End")) && <p className="text-red-500 text-sm mt-1">* {error.message}</p>}
            </div>
        </div>
    );
};

export default DatePickerRange;