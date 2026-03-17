const ColorPicker = ({ field, schema }) => {

  const { value } = field;
  const { placeholder } = schema;

  return (
    <div className={`flex gap-3 items-center w-full bg-white`}>
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