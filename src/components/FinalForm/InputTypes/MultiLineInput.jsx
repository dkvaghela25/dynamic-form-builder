const MultiLineInput = ({ field, error, schema }) => {

  const { placeholder, validationRules } = schema;
  const { value } = field;
  const maxLength = validationRules.find(rule => rule.type === "maxLength")?.value

  return (
    <div className="relative">
      <textarea
        {...field}
        className={`
        w-full h-30 resize-none appearance-none border border-(--input-border-color) py-1 px-2 rounded focus:outline-none 
        transition-all duration-300 ease-in-out
        hover:shadow-(--shadow-input-hover) 
        focus:shadow-(--shadow-input-focus) 
        ${error ? "shadow-(--shadow-input-error)!" : "shadow-(--shadow-input)"}
        `}
        error={error}
        placeholder={placeholder}
      ></textarea>
      <span className="absolute z-10 bg-white mr-3 bottom-2 right-1 text-(--secondary-text) text-sm">{value.length} {maxLength && <span>/ {maxLength}</span>}</span>
    </div>
  );
};

export default MultiLineInput;


