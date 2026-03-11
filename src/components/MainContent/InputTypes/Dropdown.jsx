import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";
import { GoChevronDown } from "react-icons/go";

const Dropdown = ({ field, error, handleChange }) => {

    const { schema } = useCurrentSchemaContext();
    const { placeholder, value, options } = schema;

    return (
        <div className="relative w-full">
            <select
                {...field}
                onChange={handleChange}
                defaultValue=""
                className={`w-full pr-10 appearance-none rounded-xl border ${value === "" ? "text-slate-300" : "text-slate-900"} ${error ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
            >
                <option className="text-slate-900" disabled value="">{placeholder || "Select Option"}</option>
                {options.map(({ label, value }) => {
                    return <option className="text-slate-900" key={label} value={value}>{label}</option>
                })}
            </select>
            <span className="flex justify-end items-center h-0 text-slate-500 pointer-events-none absolute top-6 right-3">
                <GoChevronDown className="absolute h-6 w-6" />
            </span>
        </div>
    );
};

export default Dropdown;