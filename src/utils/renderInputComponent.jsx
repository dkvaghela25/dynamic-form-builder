import CheckBox from "../components/FormContainer/InputTypes/CheckBox";
import Dropdown from "../components/FormContainer/InputTypes/Dropdown";
import FileUpload from "../components/FormContainer/InputTypes/FileUpload";
import MultiLineInput from "../components/FormContainer/InputTypes/MultiLineInput";
import RadioGroup from "../components/FormContainer/InputTypes/RadioGroup";
import TextInput from "../components/FormContainer/InputTypes/TextInput";

export const renderInputComponent = (field, error, index, type, setFormSchema) => {

    const handleChange = (e) => {
        field.onChange(e);
        setFormSchema(prev => {
            return prev.map((currElem, currIndex) => {
                if (currIndex === index) {
                    return { ...currElem, value: e.target.value }
                } else {
                    return currElem;
                }
            })
        })
    }

    switch (type) {
        case "text":
        case "number":
        case "password":
        case "email":
        case "date":
        case "datetime-local":
        case "color": return <TextInput field={field} error={error} handleChange={handleChange} />;
        case "textarea": return <MultiLineInput field={field} error={error} handleChange={handleChange} />;
        case "select": return <Dropdown field={field} error={error} handleChange={handleChange} />;
        case "radio": return <RadioGroup error={error} handleChange={handleChange} />;
        case "checkbox": return <CheckBox field={field} error={error} />;
        case "file": return <FileUpload field={field} error={error} />;

        default: return <div></div>
    }

}