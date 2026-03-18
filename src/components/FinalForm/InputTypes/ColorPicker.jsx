const ColorPicker = ({ field, error, schema }) => {

  const { value } = field;
  const { placeholder } = schema;

  return (
    <div
      className={`
          flex gap-3 items-center w-full bg-white
          border border-(--input-border-color) py-1 px-2 rounded  
          transition-all duration-300 ease-in-out
          hover:shadow-(--shadow-input-hover) 
          ${error ? "shadow-(--shadow-input-error)!" : "shadow-(--shadow-input)"}
        `}
    >
      <input
        {...field}
        type="color"
        className="w-10 h-11 cursor-pointer rounded-2xl transition-colors duration-300"
      />
      <label className={`font-medium ${!value ? "text-(--secondary-text) font-normal" : ""}`}>{value || placeholder || "Select color"}</label>
    </div>
  );
};

export default ColorPicker;