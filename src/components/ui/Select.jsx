import { GoChevronDown } from "react-icons/go";

const Select = ({ name, value, multiple, placeholder, options, handleChange }) => {
    return (
        <div className="relative w-full">
            <select
                size={1}
                multiple={multiple}
                name={name}
                value={value}
                onChange={handleChange}
                className={`w-full pr-10 appearance-none rounded-xl border ${((value.length === 0)) ? "text-slate-300" : "text-slate-900"} bg-white px-3 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
            >
                <option className="text-slate-900" disabled hidden value="">{placeholder}</option>
                {options.map((option, index) => {
                    return <option className="text-slate-900" key={index} value={option?.value || option}>{option?.label || option}</option>
                })}
            </select>
            <span className="flex justify-end items-center h-0 text-slate-500 pointer-events-none absolute top-6 right-3">
                <GoChevronDown className="absolute h-6 w-6" />
            </span>
        </div>
    );
};

export default Select;