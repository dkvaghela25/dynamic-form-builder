import { FormProvider, useForm } from "react-hook-form";
import AvailableInputs from "../components/AvailableInputs/AvailableInputs";
import JsonViewer from "../components/JsonViewer/JsonViewer";
import { DevTool } from "@hookform/devtools";
import FormContainer from "../components/FormContainer/FormContainer";

const DynamicForm = () => {

    const methods = useForm({
        defaultValues: {}
    });

    return (
        <>
            <AvailableInputs />

            <FormProvider {...methods}>
                <FormContainer />
            </FormProvider>

            <JsonViewer />

            <DevTool control={methods.control} />
        </>
    );
};

export default DynamicForm;