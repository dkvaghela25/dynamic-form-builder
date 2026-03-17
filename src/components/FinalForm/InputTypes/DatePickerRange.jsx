import { useFormContext } from "react-hook-form";
import CustomDatePicker from "../../ui/CustomDatePicker";

const DatePickerRange = ({ field }) => {

  const { trigger } = useFormContext();
  const { value: { startDate, endDate }, onChange, name } = field;

  console.log(field.value);

  const handleStartChange = (newDate) => {
    console.log(newDate);
    onChange?.({
      ...field.value,
      startDate: newDate
    });
    trigger(name);
  };
  
  const handleEndChange = (newDate) => {
    console.log(newDate);
    onChange?.({
      ...field.value,
      endDate: newDate
    });
    trigger(name);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-xs font-semibold mb-1 block text-(--secondary-text)">Start Date</label>
          <CustomDatePicker
            selectedDate={startDate}
            handleChange={handleStartChange}
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