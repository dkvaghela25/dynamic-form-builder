import MultiLineInput from "../components/FormContainer/InputTypes/MultiLineInput";
import TextInput from "../components/FormContainer/InputTypes/TextInput";

export const renderInputComponent = (field, error, type) => {

    switch (type) {
        case "text":
        case "number":
        case "password":
        case "email":
        case "color": return <TextInput field={field} error={error} />;
        case "textarea": return <MultiLineInput field={field} error={error} />;

        default: return <div></div>
    }

}