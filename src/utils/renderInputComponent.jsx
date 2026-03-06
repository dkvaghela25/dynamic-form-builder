import Dropdown from "../components/FormContainer/InputTypes/Dropdown";
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
        case "color": return <TextInput field={field} error={error} handleChange={handleChange} />;
        case "textarea": return <MultiLineInput field={field} error={error} handleChange={handleChange} />;
        case "select": return <Dropdown field={field} error={error} handleChange={handleChange} />;
        case "radio": return <RadioGroup field={field} error={error} handleChange={handleChange} />;

        default: return <div></div>
    }

}