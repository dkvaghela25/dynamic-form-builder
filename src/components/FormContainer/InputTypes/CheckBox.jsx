import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";
import { useSetFormSchema } from "../../../contexts/formSchemaContext";

const CheckBox = ({ field, error }) => {

    const { schema, index } = useCurrentSchemaContext();
    const { value, options } = schema;
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
            {options?.map(({ label, value }) => {
                return (
                    <div className="flex gap-3 items-center" key={label}>
                        <input
                            className="h-4 w-4 accent-indigo-600"
                            type="checkbox"
                            name={label}
                            value={value}
                            onChange={handleChange}
                        />
                        <label className="text-[16px] font-medium text-slate-700">{label}</label>
                    </div>
                )
            })}
        </div>
    );
};

export default CheckBox;