import { FormProvider, useForm } from "react-hook-form";
import { getDefaultValues } from "../../utils/getDefaultValues";
import { DevTool } from "@hookform/devtools";
import InputController from "./InputController";
import { useSearchParams } from "react-router-dom";
import SubmitButton from "./FormActions";

const FinalForm = ({ formSchema }) => {

    const [searchParams, _] = useSearchParams();
    const submittedFormData = JSON.parse(localStorage.getItem("submittedFormData")) || [];

    const submissionId = searchParams.get('submissionId');

    const defaultValues = getDefaultValues(formSchema);

    const initialValues = submissionId
        ? submittedFormData.find(data => data.submissionId === submissionId)?.data
        : getDefaultValues(formSchema);

    const methods = useForm({
        mode: "onBlur",
        defaultValues: initialValues,
    });

    return (
        <>
            <FormProvider {...methods}>
                <form action="" className="flex flex-col gap-3">
                    {formSchema.map(schema => {
                        return <InputController key={schema.id} schema={schema} />
                    })}
                    <SubmitButton submittedFormData={submittedFormData} submissionId={submissionId} defaultValues={defaultValues} />
                </form>
            </FormProvider>
            <DevTool control={methods.control} />
        </>
    );
};

export default FinalForm;