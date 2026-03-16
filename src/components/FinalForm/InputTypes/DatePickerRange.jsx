import CustomDatePicker from "../../ui/CustomDatePicker";

const DatePickerRange = ({ schema, field, error }) => {
  const { value: { startDate, endDate } } = field;

  return (
    <div className="flex gap-2">
      <CustomDatePicker schema={schema} error={error} currValue={startDate}/>
      <CustomDatePicker schema={schema} error={error} currValue={endDate} />
    </div>
  );
};

export default DatePickerRange;