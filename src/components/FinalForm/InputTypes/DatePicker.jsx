import { useFormContext } from "react-hook-form";
import CustomDatePicker from "../../ui/CustomDatePicker";
import { getRuleValue } from "../../../utils/getRuleValue";

const DatePicker = ({ field, error, schema }) => {

  const { trigger } = useFormContext();
  const { type, name, validationRules } = schema;
  const { value, onChange } = field;

  const handleChange = (newValue) => {
    onChange(newValue);
    trigger(name);
  }

  const min = getRuleValue(validationRules, "minDate")
  const max = getRuleValue(validationRules, "maxDate")

  return (
    <>
      {type === "date" && <CustomDatePicker selectedDate={value} handleChange={handleChange} min={min} max={max} errorMessage={error?.message} />}
      {type === "datetime-local" && <CustomDatePicker type="datetime-local" selectedDate={value} handleChange={handleChange} min={min} max={max} errorMessage={error?.message} />}
    </>
  );
};

export default DatePicker;