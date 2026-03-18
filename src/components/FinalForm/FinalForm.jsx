import { FormProvider, useForm } from "react-hook-form";
import { getDefaultValues } from "../../utils/getDefaultValues";
import { DevTool } from "@hookform/devtools";
import InputController from "./InputController";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toastNotification } from "../../utils/toastHelper";
import { generateUniqueId } from "../../utils/generateUniqueId";

const FinalForm = ({ formSchema }) => {

    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const submittedFormData = JSON.parse(localStorage.getItem("submittedFormData")) || [];

    const submissionId = searchParams.get('submissionId');

    const defaultValues = submissionId
        ? submittedFormData.find(data => data.submissionId === submissionId)?.data
        : getDefaultValues(formSchema);

    const methods = useForm({
        mode: "onBlur",
        defaultValues,
    });

    const { handleSubmit } = methods;
    const handleFormSubmit = async (data) => {

        if(submissionId) {
            const newFormData = submittedFormData.map(formData => {
                if(formData.submissionId === submissionId) {
                    return { data: { ...data }, submissionTime: new Date() }
                } else {
                    return formData;
                }
            })
            toastNotification("Form edited successfully", "success")
            localStorage.setItem("submittedFormData", JSON.stringify(newFormData));
        } else {
            const uniqueId = generateUniqueId("submission");
            const newFormData = [
                ...submittedFormData,
                { data: { ...data }, submissionId: uniqueId, submissionTime: new Date() }
            ]
            localStorage.setItem("submittedFormData", JSON.stringify(newFormData));
            toastNotification("Form submitted successfully", "success")
        }

        navigate("/list")
    }

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleFormSubmit)} action="" className="flex flex-col gap-3">
                    {formSchema.map(schema => {
                        return <InputController key={schema.id} schema={schema} />
                    })}
                    <input
                        type="submit"
                        className="cursor-pointer rounded w-fit self-center bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        value={submissionId ? "Edit" : "Submit"}
                    />
                </form>
            </FormProvider>
            <DevTool control={methods.control} />
        </>
    );
};

export default FinalForm;