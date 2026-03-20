import { GoChevronDown } from "react-icons/go";

const Select = ({ name, value, multiple = false, placeholder, options, handleChange, className = "" }) => {
    const isEmptyValue = Array.isArray(value)
        ? value.length === 0
        : value === "" || value === null || value === undefined;

    return (
        <div className="relative w-full">
            <select
                size={1}
                multiple={multiple}
                name={name}
                value={value}
                onChange={handleChange}
                className={`${className} w-full pr-10 appearance-none rounded-lg border ${isEmptyValue ? "text-slate-300" : "text-slate-900"} bg-white px-2 py-1.5 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
            >
                <option className="text-slate-900" disabled hidden value="">{placeholder}</option>
                {options?.map((option, index) => {
                    return <option className="text-slate-900" key={index} value={option?.value || option}>{option?.label || option}</option>
                })}
            </select>
            <span className="flex justify-end items-center h-0 text-slate-500 pointer-events-none absolute top-5 right-2">
                <GoChevronDown className="absolute h-5 w-5" />
            </span>
        </div>
    );
};

export default Select;