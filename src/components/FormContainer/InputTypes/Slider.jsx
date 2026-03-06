import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";

const Slider = ({ field, error, handleChange }) => {

    const { schema } = useCurrentSchemaContext();

    const { placeholder, value, validationRules } = schema;

    return (
        <div className={`flex px-4 py-2 justify-between items-center gap-5 rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white text-slate-900 transition`}>
            <input
                {...field}
                required={validationRules.required}
                className={`w-[95%]`}
                type="range"
                value={value}
                error={error}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <span className="text-[20px] font-semibold">{value}</span>
        </div>
    );
};

export default Slider;