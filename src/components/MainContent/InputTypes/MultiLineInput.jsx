import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";

const MultiLineInput = ({ field, error, handleChange }) => {

    const { schema } = useCurrentSchemaContext();
    const { value, placeholder, validationRules: { required } } = schema;

    return (
        <textarea
        {...field}
            required={required}
            className={`w-full h-25 rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100`}
            value={value}
            error={error}
            onChange={handleChange}
            placeholder={placeholder}
        ></textarea>
    );
};

export default MultiLineInput;