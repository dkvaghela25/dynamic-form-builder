import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";

const RadioGroup = ({ error, handleChange }) => {

    const { schema } = useCurrentSchemaContext();
    const { name, options } = schema;

    return (
        <div className={`grid grid-cols-4 p-3 gap-2 w-full rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white text-slate-900 transition`}>
            {options?.map(({ label, value }) => {
                return (
                    <div className="flex gap-3 items-center" key={label}>
                        <input
                            className="h-4 w-4 accent-indigo-600"
                            type="radio"
                            name={name}
                            onChange={handleChange}
                            value={value}
                        />
                        <label className="text-[16px] font-medium text-slate-700">{label}</label>
                    </div>
                )
            })}
        </div>
    );
};

export default RadioGroup;