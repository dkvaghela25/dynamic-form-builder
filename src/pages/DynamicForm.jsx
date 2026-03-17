import AvailableInputs from "../components/AvailableInputs/AvailableInputs";
import JsonViewer from "../components/JsonViewer/JsonViewer";
import MainContent from "../components/MainContent/MainContent";

const DynamicForm = () => {
    return (
        <div className="flex w-full gap-10">
            <AvailableInputs />
            <MainContent />
            <JsonViewer />
        </div>
    );
};

export default DynamicForm;