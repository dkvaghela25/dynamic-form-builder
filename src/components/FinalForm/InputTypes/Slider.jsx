const Slider = ({ field, error, schema }) => {
  const { step, min, max, validationRules } = schema;
  const { value: currentValue } = field;
  return (
    <div
      className={`
          flex flex-col w-full gap-2
          border border-(--input-border-color) px-4 rounded  
          transition-all duration-300 ease-in-out
          hover:shadow-(--shadow-input-hover) 
          ${error ? "shadow-(--shadow-input-error)!" : "shadow-(--shadow-input)"}
        `}
    >
      <div className="flex justify-between items-center py-2 gap-5 group">
        <input
          {...field}
          type="range"
          min={min}
          max={max}
          step={step}
          required={validationRules?.required}
          value={currentValue}
          className={`
            h-2 w-full cursor-pointer rounded-lg focus:outline-none accent-(--primary-button-bg)
            transition-all duration-300
            
          `}
        />

        <div className="min-w-10 text-right">
          <span className={`text-lg font-bold transition-colors duration-300 ${error ? "text-(--destructive)" : "text-slate-700"}`}>
            {currentValue || "NaN"} 
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slider;