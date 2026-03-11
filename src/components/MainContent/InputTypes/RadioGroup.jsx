import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";

const RadioGroup = ({ error, handleChange }) => {

    const { schema } = useCurrentSchemaContext();
    const { name, value, options } = schema;

    return (
        <div className={`grid grid-cols-4 p-3 gap-2 w-full rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white text-slate-900 transition`}>
            {options?.map(option => {
                return (
                    <div className="flex gap-3 items-center" key={option.label}>
                        <input
                            checked={option.value === value}
                            className="h-4 w-4 accent-indigo-600"
                            type="radio"
                            name={name}
                            onChange={handleChange}
                            value={option.value}
                        />
                        <label className="text-[16px] font-medium text-slate-700">{option.label}</label>
                    </div>
                )
            })}
        </div>
    );
};

export default RadioGroup;