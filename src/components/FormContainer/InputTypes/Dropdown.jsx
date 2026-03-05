import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";

const Dropdown = ({ field, error, handleChange }) => {

    const { schema } = useCurrentSchemaContext();
    const { placeholder, value, options } = schema;

    return (
        <select
            {...field}
            onChange={handleChange}
            defaultValue=""
            className={`w-full rounded-xl border ${value === "" ? "text-slate-300" : "text-slate-900"} ${error ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
        >
            <option className="text-slate-900" disabled value="">{placeholder || "Select Option"}</option>
            {options.map(({ label, value }) => {
                return <option className="text-slate-900" key={label} value={value}>{label}</option>
            })}
        </select>
    );
};

export default Dropdown;