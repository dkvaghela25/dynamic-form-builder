import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const TextInput = ({ field, error, schema }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { type, placeholder, validationRules } = schema;

  return (
    <div className="relative w-full">
      <input
        {...field}
        required={validationRules?.required}
        placeholder={placeholder}
        type={type === "password" && showPassword ? "text" : type}
        className={`
          w-full border border-(--input-border-color) py-1 px-2 rounded focus:outline-none 
          transition-all duration-300 ease-in-out
          hover:shadow-(--shadow-input-hover) 
          focus:shadow-(--shadow-input-focus) 
          ${error ? "shadow-(--shadow-input-error)!" : "shadow-(--shadow-input)"}
        `}
      />

      {type === "password" && (
        <button
          type="button" 
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-(--secondary-text) hover:text-primary-text transition-colors duration-200"
        >
          {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
        </button>
      )}
    </div>
  );
};

export default TextInput;