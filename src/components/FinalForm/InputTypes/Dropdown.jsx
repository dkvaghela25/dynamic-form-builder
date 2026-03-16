import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";

const Dropdown = ({ field, error, schema }) => {

  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { value, onChange } = field;
  const { placeholder, options } = schema;
  const selectedOption = options.find((opt) => opt.value === value) || {};

  const changeValue = (option) => {
    onChange(option.value)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between cursor-pointer
          border border-(--input-border-color) py-2 px-3 rounded-lg outline-none 
          transition-all duration-300 ease-in-out
          hover:shadow-(--shadow-input-hover)
          ${selectedOption.label ? "text-(--primary-text)" : "text-(--secondary-text)"}
          ${isOpen ? "shadow-(--shadow-input-focus)!" : ""}
          ${error ? "shadow-(--shadow-input-error)!" : "shadow-(--shadow-input)"}
        `}
      >
        <span className="truncate select-none">
          {selectedOption.label || placeholder || "Select Option"}
        </span>
        <GoChevronDown
          className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      <ul
        className={`
          absolute z-50 bg-white w-full border overflow-hidden border-(--input-border-color) rounded-lg mt-2 flex flex-col 
          transition-all duration-200 ease-out origin-top shadow-lg
          ${isOpen
            ? "opacity-100 scale-100 translate-y-0 visible"
            : "opacity-0 scale-95 -translate-y-2 invisible"
          }
        `}
      >
        {options.map((option) => (
          <li
            key={option.value}
            onClick={() => changeValue(option)}
            className={`
              cursor-pointer border-b border-(--input-border-color) last:border-0 py-2 px-3
              ${value === option.value ? "bg-(--secondary-bg) text-(--input-text) font-medium" : "text-slate-700"}
            `}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;