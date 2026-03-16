import CustomDatePicker from "../../ui/CustomDatePicker";

const DatePicker = ({ field, error, schema }) => {
  const { type } = schema;

  return (
    <>
      {type === "date" && <CustomDatePicker schema={schema} error={error} field={field} />}
    </>
  );
};

export default DatePicker;