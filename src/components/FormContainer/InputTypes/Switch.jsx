import { useCurrentSchemaContext } from "../../../contexts/CurrentSchemaContext";
import { useSetFormSchema } from "../../../contexts/formSchemaContext";

const Switch = ({ field, error }) => {

  const setFormData = useSetFormSchema();
  const { schema, index } = useCurrentSchemaContext();
  const { value, placeholder } = schema;

  const handleChange = (e) => {
    field.onChange(e);
    setFormData(prev => {
      return prev.map((currSchema, currIndex) => {
        return currIndex === index ? { ...currSchema, value: e.target.checked } : currSchema
      })
    })
  }

  return (
    <div className={`flex gap-3 items-center p-3 w-full rounded-xl border ${error ? "border-red-300" : "border-slate-300"} bg-white text-slate-900 transition`}>
      <div className="relative w-10 h-6">
        <input
          onChange={handleChange}
          checked={value}
          id="switch-component"
          type="checkbox"
          className="peer appearance-none p-1 w-full h-full bg-slate-300 rounded-full checked:bg-indigo-600 cursor-pointer transition-colors duration-300"
        />
        <label htmlFor="switch-component" className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-4 peer-checked:border-slate-800 cursor-pointer"></label>
      </div>
      <label htmlFor="switch-component">{placeholder}</label>
    </div>
  );
};

export default Switch;