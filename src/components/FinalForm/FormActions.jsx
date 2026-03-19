import { toastNotification } from "../../utils/toastHelper";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";

const FormActions = ({ submittedFormData, submissionId, defaultValues }) => {

    const navigate = useNavigate();
    const { handleSubmit, reset } = useFormContext();

    const handleFormSubmit = async (data) => {

        if (submissionId) {
            const newFormData = submittedFormData.map(formData => {
                if (formData.submissionId === submissionId) {
                    return { ...formData, data: { ...data }, submissionTime: new Date() }
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

    const handleReset = () => {
        console.log("Reset")
        console.log(defaultValues)
        reset(defaultValues);
    }

    return (
        <div className="flex gap-5 justify-between border-t pt-5 border-(--border)" >
            <div>
                {submissionId &&
                    <button
                        type="button"
                        onClick={() => navigate("/list")}
                        className="cursor-pointer rounded w-fit self-center bg-white px-6 py-2.5 text-sm font-semibold text-(--primary-text) border transition hover:bg-(--secondary-button-bg)"
                    >
                        Go Back
                    </button>
                }
            </div>
            <div className="flex gap-5">
                <button
                    type="button"
                    onClick={handleReset}
                    className="cursor-pointer rounded w-fit self-center bg-white px-6 py-2.5 text-sm font-semibold text-(--primary-text) border transition hover:bg-(--secondary-button-bg)"
                >
                    Reset
                </button>
                <button
                    type="button"
                    onClick={handleSubmit(handleFormSubmit)}
                    className="cursor-pointer rounded w-fit self-center bg-(--primary-button-bg) px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                    {submissionId ? "Edit Details" : "Submit Form"}
                </button>
            </div>
        </div>
    );
};

export default FormActions;