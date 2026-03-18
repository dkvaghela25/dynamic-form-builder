import { FormProvider, useForm } from "react-hook-form";
import { getDefaultValues } from "../../utils/getDefaultValues";
import { DevTool } from "@hookform/devtools";
import InputController from "./InputController";
import { useNavigate } from "react-router-dom";
import { toastNotification } from "../../utils/toastHelper";

const FinalForm = ({ formSchema }) => {

    const navigate = useNavigate();
    const submittedFormData = JSON.parse(localStorage.getItem("submittedFormData"));
    const defaultValues = submittedFormData?.data || getDefaultValues(formSchema);

    const methods = useForm({
        mode: "onBlur",
        defaultValues,
    });

    const { handleSubmit } = methods;
    const handleFormSubmit = async (data) => {
        localStorage.setItem("submittedFormData", JSON.stringify({
            data: {
                ...data,
            },
            submissionTime: new Date()
        }));
        toastNotification("Form submitted successfully", "success")
        navigate("/confirmation-page")
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
                    />
                </form>
            </FormProvider>
            <DevTool control={methods.control} />
        </>
    );
};

export default FinalForm;