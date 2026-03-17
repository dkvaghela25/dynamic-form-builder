import { useFormContext } from "react-hook-form";
import CustomDatePicker from "../../ui/CustomDatePicker";
import { getRuleValue } from "../../../utils/getRuleValue";

const DatePickerRange = ({ field, schema }) => {

  const { trigger } = useFormContext();
  const { value: { startDate, endDate }, onChange, name } = field;
  const { validationRules } = schema;


  const handleStartChange = (newDate) => {
    onChange?.({
      ...field.value,
      startDate: newDate
    });
    trigger(name);
  };

  const handleEndChange = (newDate) => {
    onChange?.({
      ...field.value,
      endDate: newDate
    });
    trigger(name);
  };

  const min = getRuleValue(validationRules, "minStartDate")
  const max = getRuleValue(validationRules, "maxStartDate")

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-xs font-semibold mb-1 block text-(--secondary-text)">Start Date</label>
          <CustomDatePicker
            selectedDate={startDate}
            handleChange={handleStartChange}
            min={min}
            max={max}
          />
        </div>

        <div className="flex-1">
          <label className="text-xs font-semibold mb-1 block text-(--secondary-text)">End Date</label>
          <CustomDatePicker
            selectedDate={endDate}
            handleChange={handleEndChange}
          />
        </div>
      </div>

    </div>
  );
};

export default DatePickerRange;