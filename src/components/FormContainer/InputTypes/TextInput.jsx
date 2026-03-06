import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";

const TextInput = ({ field, error, handleChange }) => {

    const [showPassword, setShowPassword] = useState(false)
    const { schema } = useCurrentSchemaContext();

    const { type, placeholder, value, validationRules } = schema;

    return (
        <>
            <input
                {...field}
                required={validationRules.required}
                className={`w-full ${type === "color" ? "h-12 p-1! cursor-pointer rounded-sm!" : ""} rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
                type={(type === "password" && showPassword) ? "text" : type}
                value={value}
                error={error}
                onChange={handleChange}
                placeholder={placeholder}
            />
            {type === "password" &&
                <span className="flex justify-end h-0" onClick={() => setShowPassword(!showPassword)} >
                    {showPassword ?
                        <FaEye className="w-6 text-right h-6 relative -top-8.5 right-4 cursor-pointer" /> :
                        <FaEyeSlash className="w-6 text-right h-6 relative -top-8.5 right-4 cursor-pointer" />
                    }
                </span>
            }
        </>
    );
};

export default TextInput;

<>


</>