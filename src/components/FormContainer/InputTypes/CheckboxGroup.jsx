import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";
import { useSetFormSchema } from "../../../contexts/formSchemaContext";

const CheckboxGroup = ({ field, error }) => {

    const { schema, index } = useCurrentSchemaContext();
    const { name, value, options } = schema;
    const setFormData = useSetFormSchema();


    const handleChange = (e) => {

        const { value: selectedValue, checked } = e.target;

        const newValue = checked
            ? [...value, selectedValue]
            : value.filter(currValue => currValue !== selectedValue)

        setFormData(prev => {
            return prev.map((currSchema, currIndex) => {
                return currIndex === index ? { ...currSchema, value: newValue } : currSchema
            })
        })

        field.onChange(newValue);
    }

    return (
        <div className={`grid grid-cols-4 p-3 gap-2 w-full rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white text-slate-900 transition`}>
            {options?.map(option => {
                return (
                    <div className="flex gap-3 items-center" key={option.label}>
                        <input
                            id={`${option.label}-checkbox-id`}
                            checked={value.includes(option.value)}
                            className="h-4 w-4 accent-indigo-600"
                            type="checkbox"
                            name={name}
                            value={option.value}
                            onChange={handleChange}
                        />
                        <label htmlFor={`${option.label}-checkbox-id`} className="text-[16px] font-medium text-slate-700">{option.label}</label>
                    </div>
                )
            })}
        </div>
    );
};

export default CheckboxGroup;