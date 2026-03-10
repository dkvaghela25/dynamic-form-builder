import { GoChevronDown } from "react-icons/go";

const Select = ({ name, value, multiple, placeholder, options, handleChange }) => {
    // Determine if we should show the "placeholder" color
    const isPlaceholderActive = multiple ? value.length === 0 : !value;

    return (
        <div className="relative w-full">
            <select
                size={1}
                multiple={multiple}
                name={name}
                value={value}
                onChange={handleChange}
                // Toggle text color based on whether a value is selected
                className={`w-full pr-10 appearance-none rounded-xl border ${
                    isPlaceholderActive ? "text-slate-400" : "text-slate-900"
                } bg-white px-3 py-2.5 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
            >
                {/* 
                  The placeholder option: 
                  - hidden: removes it from the dropdown list
                  - disabled: prevents users from selecting it manually
                  - value="": matches the initial empty state
                */}
                <option value="" disabled hidden>
                    {placeholder}
                </option>

                {options.map((option, index) => (
                    <option 
                        className="text-slate-900" 
                        key={index} 
                        value={option?.value ?? option}
                    >
                        {option?.label ?? option}
                    </option>
                ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                <GoChevronDown className="h-6 w-6" />
            </span>
        </div>
    );
};

export default Select;
