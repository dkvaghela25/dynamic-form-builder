import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { FormSchemaContext } from "../../contexts/formSchemaContext";

const TextInput = ({ field, schema, error, index }) => {


    const { trigger } = useFormContext();
    const { setFormSchema } = useContext(FormSchemaContext);

    const handleChange = (e) => {
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

    return (
        <>
            <input
                required={schema.validationRules.required}
                {...field}
                className={`"w-full rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
                type={schema.type}
                value={schema.value}
                error={error}
                onChange={(e) => {
                    field.onChange(e);
                    handleChange(e);
                }}
                onBlur={(e) => {
                    field.onBlur(e);
                    trigger(schema.name);
                }}
                placeholder={schema.placeholder}
            />
        </>
    );
};

export default TextInput;