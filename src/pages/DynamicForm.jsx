import { FormProvider, useForm } from "react-hook-form";
import AvailableInputs from "../components/AvailableInputs/AvailableInputs";
import LivePreview from "../components/LivePreview/LivePreview";
import JsonViewer from "../components/JsonViewer/JsonViewer";
import { DevTool } from "@hookform/devtools";

const DynamicForm = () => {

    const methods = useForm({
        defaultValues: {}
    });

    return (
        <>
            <AvailableInputs />

            <FormProvider {...methods}>
                <LivePreview />
            </FormProvider>

            <JsonViewer />

            <DevTool control={methods.control} />
        </>
    );
};

export default DynamicForm;