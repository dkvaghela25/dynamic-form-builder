import CustomDatePicker from "../../ui/CustomDatePicker";

const DatePicker = ({ field, schema }) => {
  const { type } = schema;

  const {value, onChange} = field;

  return (
    <>
      {type === "date" && <CustomDatePicker selectedDate={value} onChange={onChange} />}
      {type === "datetime-local" && <CustomDatePicker type="datetime-local" selectedDate={value} onChange={onChange} />}
    </>
  );
};

export default DatePicker;