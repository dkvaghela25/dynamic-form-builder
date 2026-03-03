import TextInput from "../components/FormContainer/InputTypes/TextInput";

export const renderInputComponent = (field, error, type) => {

    switch (type) {
        case "text":
        case "number":
        case "password":
        case "email":
        case "color":
        case "textarea": return <TextInput field={field} error={error} />;

        default: return <div></div>
    }

}