import { GoChevronDown } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

const MultiSelect = ({ field, error, schema }) => {

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [dropUp, setDropUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { placeholder, options: availableOptions } = schema;
  const { value: selectedOptions, onChange } = field;

  const initialOptions = availableOptions.filter(({ value }) => !(selectedOptions.includes(value)));
  const [filteredOptions, setFilteredOptions] = useState(initialOptions);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = filteredOptions.length * 50;

      setDropUp(spaceBelow < dropdownHeight);
    }
  }, [isOpen, filteredOptions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateValue = (updatedValue) => {
    onChange(updatedValue);
    setFilteredOptions(availableOptions.filter(({ value }) => !(updatedValue.includes(value))))
  }

  const handleDisplayOptions = (e) => {
    e.preventDefault();
    if (!isOpen) {
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
    <div className="relative w-full" ref={containerRef}>
      <div
        onClick={handleDisplayOptions}
        className={`
          w-full flex items-center justify-between cursor-pointer
          border border-(--input-border-color) py-2 px-3 rounded-lg outline-none 
          transition-all duration-300 ease-in-out
          hover:shadow-(--shadow-input-hover)
          ${selectedOptions.length !== 0 ? "text-(--primary-text) border-(--input-focus-border-color)" : "text-(--secondary-text)"}
          ${isOpen ? "shadow-(--shadow-input-focus)!" : ""}
          ${error ? "shadow-(--shadow-input-error)!" : "shadow-(--shadow-input)"}
        `}
      >
        <div className="flex flex-wrap gap-2 w-[95%]">
          {selectedOptions.map((option) => (
            <span
              key={option}
              className="flex items-center gap-1 rounded-lg bg-(--secondary-button-bg) border border-(--input-focus-border-color) px-2 py-0.5 text-sm font-medium text-(--input-text)"
            >
              {availableOptions?.find((currOption) => currOption.value == option)?.label}
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
        <GoChevronDown
          className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      <ul
        className={`
          absolute z-50 bg-white w-full border overflow-hidden border-(--input-border-color) rounded-lg mt-2 
          transition-all duration-200 ease-out origin-top shadow-lg hidden
          ${isOpen
            ? "opacity-100 scale-100 translate-y-0 flex! flex-col"
            : "opacity-0 scale-95 -translate-y-2 "
          }
          ${dropUp
            ? "bottom-full mb-2 origin-bottom"
            : "top-full mt-2 origin-top"
          }
        `}
      >
        {filteredOptions.length !== 0 ?
          filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={(e) => addOption(e, option.value)}
              className={`cursor-pointer border-b border-(--input-border-color) last:border-0 py-2 px-3`}
            >
              {option.label}
            </li>
          ))
          : <div className="text-slate-400 text-center cursor-pointer p-4 border-slate-300">No Options Found</div>
        }
      </ul>
    </div>
  );
};

export default MultiSelect;