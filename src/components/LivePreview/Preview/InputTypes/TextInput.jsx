import { useFormContext } from "react-hook-form";
import { useSetFormSchema } from "../../../../contexts/formSchemaContext";
import { useCurrentSchemaContext } from "../../InputCard";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const TextInput = ({ field, error }) => {

    const [showPassword, setShowPassword] = useState(false)

    const { schema , index } = useCurrentSchemaContext();

    const { type, placeholder, name, value, validationRules } = schema;

    const { trigger } = useFormContext();
     const setFormSchema = useSetFormSchema();

    const handleChange = (e) => {
        field.onChange(e);
        setFormSchema(prev => {
            return prev.map((currElem, currIndex) => {
                if (currIndex === index) {
                    return { ...currElem, value: e.target.value }
                } else {
                    return currElem;
                }
            })
        })
    }

    const handleBlur = (e) => {
        field.onBlur(e);
        trigger(name);
    }

    return (
        <>
            <input
                required={validationRules.required}
                {...field}
                className={`w-full ${type === "color" ? "h-12 p-1! cursor-pointer rounded-sm!" : ""} rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
                type={(type === "password" && showPassword) ? "text" : type}
                value={value}
                error={error}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
            />
            {type === "password" &&
                <span className="flex justify-end" onClick={() => setShowPassword(!showPassword)} >
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