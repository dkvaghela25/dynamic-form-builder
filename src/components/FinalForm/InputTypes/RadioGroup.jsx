
const RadioGroup = ({ field, error, schema }) => {

  const { id, name, options } = schema;
  const { value: fieldValue, onChange } = field;

  const handleChange = (newValue) => {
    onChange(newValue)
  }

  return (
    <div
      className={`
          grid grid-cols-3 gap-2 w-full
          border border-(--input-border-color) p-2 rounded  
          transition-all duration-300 ease-in-out
          hover:shadow-(--shadow-input-hover) 
          ${error ? "shadow-(--shadow-input-error)!" : "shadow-(--shadow-input)"}
        `}
    >
      {options?.map(({ label, value }) => {

        return (
          <label
            htmlFor={`${id}-${label}`}
            className={`flex rounded-lg border border-(--input-border-color) cursor-pointer ${fieldValue === value ? "bg-(--secondary-bg) border-(--input-focus-border-color)" : ""} p-3 gap-3 items-center`}
            key={label}
          >
            <input
              checked={fieldValue === value}
              onChange={() => handleChange(value)}
              id={`${id}-${label}`}
              className="h-4 w-4 accent-(--input-text) cursor-pointer"
              type="radio"
              name={name}
            />
            <label htmlFor={`${id}-${label}`} className="text-[16px] font-medium cursor-pointer text-slate-700">
              {label}
            </label>
          </label>
        )
      })}
    </div>
  );
};

export default RadioGroup;