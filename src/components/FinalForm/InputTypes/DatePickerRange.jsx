import CustomDatePicker from "../../ui/CustomDatePicker";

const DatePickerRange = ({ field }) => {
  const {value : { startDate, endDate }, onChange} = field;

  const handleStartChange = (newDate) => {
    onChange?.({
      ...field.value,
      startDate: newDate
    });
  };

  const handleEndChange = (newDate) => {
    onChange?.({
      ...field.value,
      endDate: newDate
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-xs font-semibold mb-1 block text-(--secondary-text)">Start Date</label>
          <CustomDatePicker
            selectedDate={startDate}
            onChange={handleStartChange}
          />
        </div>

        <div className="flex-1">
          <label className="text-xs font-semibold mb-1 block text-(--secondary-text)">End Date</label>
          <CustomDatePicker
            selectedDate={endDate}
            onChange={handleEndChange}
          />
        </div>
      </div>

    </div>
  );
};

export default DatePickerRange;