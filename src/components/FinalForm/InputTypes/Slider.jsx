const Slider = ({ field, error, schema }) => {
  const { step, min, max, validationRules } = schema;
  const {value : currentValue} = field;
  return (
    <div className="flex flex-col w-full gap-2">
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
            h-2 w-full cursor-pointer rounded-lg focus:outline-none accent-(--primary-bg)
            transition-all duration-300
            ${error ? "ring-2 ring-red-400 ring-offset-2" : ""}
          `}
        />
        
        <div className="min-w-10 text-right">
          <span className={`text-lg font-bold transition-colors duration-300 ${error ? "text-red-500" : "text-slate-700"}`}>
            {currentValue}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slider;