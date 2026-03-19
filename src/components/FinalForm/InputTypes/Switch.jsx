const Switch = ({ field, error, schema }) => {

  const { id, placeholder } = schema;
  const { value, onChange } = field;

  const handleChange = (e) => {
    onChange(e);
  }

  return (
    <div
      className={`
          flex w-full gap-2
          border border-(--input-border-color) py-3 px-4 rounded  
          transition-all duration-300 ease-in-out
          hover:shadow-(--shadow-input-hover) 
          ${error ? "shadow-(--shadow-input-error)!" : "shadow-(--shadow-input)"}
        `}
    >
      <div className="relative w-10 h-6">
        <input
          checked={value}
          onChange={handleChange}
          id={`${id}-switch-component`}
          type="checkbox"
          className="peer appearance-none p-1 w-full h-full bg-slate-300 rounded-full checked:bg-(--primary-button-bg) cursor-pointer transition-colors duration-300"
        />
        <label htmlFor={`${id}-switch-component`} className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-4 peer-checked:border-slate-800 cursor-pointer"></label>
      </div>
      <label htmlFor={`${id}-switch-component`}>{placeholder}</label>
    </div>
  );
};

export default Switch;