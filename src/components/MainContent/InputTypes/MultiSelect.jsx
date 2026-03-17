import { GoChevronDown } from "react-icons/go";
import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";
import { useRef, useState } from "react";
import { useSetFormSchema } from "../../../contexts/formSchemaContext";
import { IoClose } from "react-icons/io5";

const MultiSelect = ({ field, error }) => {

    const inputRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const setFormData = useSetFormSchema();
    const { schema, index } = useCurrentSchemaContext();

    const { placeholder, value: selectedOptions, options: availableOptions } = schema;

    const initialOptions = availableOptions.filter(({ value }) => !(selectedOptions.includes(value)));
    const [filteredOptions, setFilteredOptions] = useState(initialOptions);


    const updateValue = (updatedValue) => {
        setFormData(prev => {
            return prev.map((currSchema, currIndex) => {
                return currIndex === index ? { ...currSchema, value: updatedValue } : currSchema
            })
        })
        field.onChange(updatedValue);
        setFilteredOptions(availableOptions.filter(({ value }) => !(updatedValue.includes(value))))
    }

    const handleDisplayOptions = (e) => {
        e.preventDefault();
        if(!isOpen){
            setIsOpen(true);
            inputRef.current?.focus();
        } else {
            setIsOpen(false);
        }
    };

    const addOption = (e, value) => {
        e.preventDefault();
        const newValue = [...selectedOptions, value];
        updateValue(newValue);
        inputRef.current?.focus();
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        setInputValue(value)
        setIsOpen(true);

        const regex = new RegExp(value, "i")
        setFilteredOptions(availableOptions.filter(({ label, value }) =>
            ((regex.test(label) || regex.test(value)) && !(selectedOptions.includes(value)))
        ))
    };

    const handleRemove = (e, option) => {
        e.preventDefault();
        const updatedValues = selectedOptions.filter(currOption => currOption !== option)
        updateValue(updatedValues);
    }

    const handleKeyDown = (e) => {
        if (inputValue === "" && e.code === "Backspace") {
            const updatedValues = selectedOptions.slice(0, selectedOptions.length - 1);
            updateValue(updatedValues);
        }
    }

    return (
        <div>
            <div
                onClick={handleDisplayOptions}
                className={`flex justify-between items-center w-full rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 transition`}
            >
                <div className="flex flex-wrap gap-2 w-[95%]">
                    {selectedOptions.map((option) => (
                        <span
                            key={option}
                            className="flex items-center gap-1 rounded-lg bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-sm font-medium text-indigo-700"
                        >
                            {availableOptions.find((currOption) => currOption.value == option)?.label}
                            <button
                                type="button"
                                onClick={(e) => handleRemove(e, option)}
                                className="flex items-center rounded-full p-0.5 hover:bg-indigo-200 transition-colors"
                            >
                                <IoClose className="h-3.5 w-3.5 cursor-pointer" />
                            </button>
                        </span>
                    ))}

                    <input
                        {...field}
                        ref={inputRef}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsOpen(true)}
                        placeholder={selectedOptions.length === 0 ? placeholder || "Select Option" : ""}
                        value={inputValue}
                        className={`outline-none`}
                    />
                </div>
                <GoChevronDown className="text-slate-500 pointer-events-none w-6 h-6" />
            </div>

            {isOpen &&
                <div className={`absolute mt-2 z-10 w-full max-h-70 overflow-auto rounded-lg bg-white border border-slate-300`}>
                    {filteredOptions.length !== 0
                        ? filteredOptions.map(({ label, value }, index) => {
                            return <option onClick={(e) => addOption(e, value)} className="hover:bg-indigo-50 text-sm hover:text-indigo-700 hover:font-medium text-slate-900 cursor-pointer p-2 w-full border-slate-300 border-b last:border-0" key={index} value={value}>{label}</option>
                        })
                        : <div className="text-slate-400 text-center cursor-pointer p-4 w-full border-slate-300">No Options Found</div>
                    }
                </div>
            }
        </div>
    );
};

export default MultiSelect;