import CheckboxGroup from "./InputTypes/CheckboxGroup";
import Dropdown from "./InputTypes/Dropdown";
import FileUpload from "./InputTypes/FileUpload";
import MultiLineInput from "./InputTypes/MultiLineInput";
import RadioGroup from "./InputTypes/RadioGroup";
import TextInput from "./InputTypes/TextInput";
import Slider from "./InputTypes/Slider";
import Switch from "./InputTypes/Switch";
import MultiSelect from "./InputTypes/MultiSelect";
import DatePicker from "./InputTypes/DatePicker";
import DatePickerRange from "./InputTypes/DatePickerRange";
import ColorPicker from "./InputTypes/ColorPicker";

const ComponentSwitch = ({ field, error, schema }) => {

    const { type } = schema;

    switch (type) {
        case "text":
        case "number":
        case "password":
        case "email": return <TextInput field={field} error={error} schema={schema} />;
        case "color": return <ColorPicker field={field} error={error} schema={schema} />;
        case "textarea": return <MultiLineInput field={field} error={error} schema={schema} />;
        case "select": return <Dropdown field={field} error={error} schema={schema} />;
        case "radio": return <RadioGroup field={field} schema={schema} />;
        case "checkbox": return <CheckboxGroup field={field} schema={schema} />;
        case "file": return <FileUpload field={field} error={error} schema={schema} />;
        case "date":
        case "datetime-local": return <DatePicker field={field} error={error} schema={schema} />;
        case "date-range": return <DatePickerRange field={field} error={error} />;
        case "range": return <Slider field={field} error={error} schema={schema} />;
        case "switch": return <Switch field={field} schema={schema} />;
        case "multiselect": return <MultiSelect field={field} error={error} schema={schema} />;

        default: return <div></div>
    }
};

export default ComponentSwitch;