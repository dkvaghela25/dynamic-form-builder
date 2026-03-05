import AvailableInputs from "../components/AvailableInputs/AvailableInputs";
import JsonViewer from "../components/JsonViewer/JsonViewer";
import MainContent from "../components/FormContainer/MainContent";

const DynamicForm = () => {
    return (
        <>
            <AvailableInputs />
            <MainContent />
            <JsonViewer />
        </>
    );
};

export default DynamicForm;