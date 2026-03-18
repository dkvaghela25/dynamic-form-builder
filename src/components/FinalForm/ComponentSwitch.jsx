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

const componentSwitchMap = {
    "text": TextInput,
    "number": TextInput,
    "password": TextInput,
    "email": TextInput,
    "color": ColorPicker,
    "textarea": MultiLineInput,
    "select": Dropdown,
    "radio": RadioGroup,
    "checkbox": CheckboxGroup,
    "file": FileUpload,
    "date": DatePicker,
    "datetime-local": DatePicker,
    "date-range": DatePickerRange,
    "range": Slider,
    "switch": Switch,
    "multiselect": MultiSelect,
}

const ComponentSwitch = ({ field, error, schema }) => {

    const { type } = schema;
    const Component = componentSwitchMap[type];

    return <Component field={field} error={error} schema={schema} />

};

export default ComponentSwitch;