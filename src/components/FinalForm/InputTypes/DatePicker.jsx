import { useFormContext } from "react-hook-form";
import CustomDatePicker from "../../ui/CustomDatePicker";

const DatePicker = ({ field, schema }) => {

  const { trigger } = useFormContext();
  const { type, name } = schema;
  const { value, onChange } = field;

  const handleChange = (newValue) => {
    onChange(newValue);
    trigger(name);
  }

  return (
    <>
      {type === "date" && <CustomDatePicker selectedDate={value} handleChange={handleChange} />}
      {type === "datetime-local" && <CustomDatePicker type="datetime-local" selectedDate={value} handleChange={handleChange} />}
    </>
  );
};

export default DatePicker;