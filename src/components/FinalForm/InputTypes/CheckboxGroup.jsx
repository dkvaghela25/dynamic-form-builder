
const RadioGroup = ({ field, schema }) => {

  const { name, options } = schema;
  const { value: fieldValue, onChange } = field;

  const handleChange = (newValue) => {
    if (fieldValue.includes(newValue)) {
      onChange(fieldValue.filter(value => value !== newValue))
    } else {
      onChange([...fieldValue, newValue])
    }
  }

  return (
    <div className={`grid grid-cols-3 gap-2 w-full`}>
      {options?.map(({ label, value }) => {
        console.log(fieldValue);
        console.log(value);
        console.log(fieldValue === value);

        return (
          <label
            htmlFor={label}
            className={`flex rounded-lg border border-(--input-border-color) cursor-pointer ${fieldValue.includes(value) ? "bg-(--secondary-bg) border-(--input-focus-border-color)" : ""} p-3 gap-3 items-center`}
            key={label}
          >
            <input
              onChange={() => handleChange(value)}
              id={label}
              className="h-4 w-4 accent-(--input-text) cursor-pointer"
              type="checkbox"
              name={name}
            />
            <label htmlFor={label} className="text-[16px] font-medium cursor-pointer text-slate-700">
              {label}
            </label>
          </label>
        )
      })}
    </div>
  );
};

export default RadioGroup;