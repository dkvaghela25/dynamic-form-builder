import { useCallback, useState } from "react";
import Actions from "./Actions";

const OptionsEditor = ({ options, setFormData }) => {

  const [editIndex, setEditIndex] = useState(null);
  const [inputFields, setInputFields] = useState({
    label: "",
    value: ""
  })
  const [error, setError] = useState("");

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields(prev => { return { ...prev, [name]: value } })
  }
  
  const handleClick = (e) => {
    e.preventDefault();
    
    const existingOptionLabel = options.find(option => option.label === inputFields.label)
    const existingOptionValue = options.find(option => option.value === inputFields.value)

    if (existingOptionLabel && existingOptionValue) return setError("Option already exists");
    if (existingOptionLabel) return setError("Option with this label already exists");
    if (existingOptionValue) return setError("Option with this value already exists");
    
    if (editIndex !== null) {
      const updatedOptions = options.map((currOption, currIndex) => {
        return currIndex === editIndex ? inputFields :  currOption
      })
      setFormData(prev => { return { ...prev, options: updatedOptions } })
    } else {
      setFormData(prev => { return { ...prev, options: [...prev.options, inputFields] } })
    }

    setInputFields({
      label: "",
      value: ""
    })
    setError("")
    setEditIndex(null)
  }

  const handleDelete = useCallback((e, index) => {
    e.preventDefault();
    const updatedOptions = options.filter((currOption, currIndex) => currIndex !== index);
    setFormData(prev => { return { ...prev, options: updatedOptions } })
  }, [options, setFormData])

  const handleEdit = useCallback((e, index) => {
    e.preventDefault();
    const currOption = options.find((currOption, currIndex) => currIndex === index);
    setInputFields(currOption);
    setEditIndex(index);
  }, [options])

  return (
    <div className="mt-1 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-base font-semibold text-slate-800">Options Editor</div>

      <div className="overflow-visible rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-3 bg-slate-100 text-xs font-extrabold uppercase tracking-wide text-slate-600">
          <div className="p-2 text-center">Label</div>
          <div className="p-2 text-center">Value</div>
          <div className="p-2 text-center">Action</div>
        </div>
        {options.map((option, index) => {
          return (
            <div className="grid grid-cols-3 font-semibold" key={index}>
              <div className="flex justify-center items-center border-t border-slate-200 p-2 text-center text-sm text-slate-700"><span>{option.label}</span></div>
              <div className="flex justify-center items-center border-t border-slate-200 p-2 text-center text-sm text-slate-700">{option.value}</div>
              <Actions text="Option" index={index} handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
          )
        })}
      </div>

      <div className="mt-1 grid grid-cols-1 gap-3 md:grid-cols-[3fr_3fr_1fr] md:gap-4">

        <input
          placeholder="Label"
          name="label"
          value={inputFields.label}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          type="text"
        />

        <input
          placeholder="Value"
          name="value"
          value={inputFields.value}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          type="text"
        />

        <button onClick={handleClick} className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"> {editIndex !== null ? "Edit" : "Add"}</button>
        {error && <p className="text-sm pl-3 text-red-500 -mt-2"> * {error}</p>}
      </div>
    </div>
  );
};

export default OptionsEditor;