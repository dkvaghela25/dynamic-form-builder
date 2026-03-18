import { useFormContext } from "react-hook-form";
import CustomDatePicker from "../../ui/CustomDatePicker";
import { getRuleValue } from "../../../utils/getRuleValue";

const DatePickerRange = ({ field, error, schema }) => {

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

  const getMaxEndDate = () => {
    if (startDate) {
      const startDateInMilliseconds = new Date(startDate).getTime();
      const additionalMilliseconds = 1000 * 60 * 60 * 24 * (getRuleValue(validationRules, "dateRange") || 30);
      return new Date(startDateInMilliseconds + additionalMilliseconds).toISOString().slice(0, 10);
    }
  }

  const minStartDate = getRuleValue(validationRules, "minStartDate")
  const maxStartDate = getRuleValue(validationRules, "maxStartDate")
  const minEndDate = startDate;
  const maxEndDate = getMaxEndDate();

  const startDateError = error?.message?.startsWith("Start") ? error?.message : "";
  const endDateError = error?.message?.startsWith("End") ? error?.message : "";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-xs font-semibold mb-1 block text-(--secondary-text)">Start Date</label>
          <CustomDatePicker
            selectedDate={startDate}
            handleChange={handleStartChange}
            min={minStartDate}
            max={maxStartDate}
            errorMessage={startDateError}
          />
        </div>

        <div className="flex-1">
          <label className="text-xs font-semibold mb-1 block text-(--secondary-text)">End Date</label>
          <CustomDatePicker
            selectedDate={endDate}
            handleChange={handleEndChange}
            min={minEndDate}
            max={maxEndDate}
            errorMessage={endDateError}
          />
        </div>
      </div>

    </div>
  );
};

export default DatePickerRange;