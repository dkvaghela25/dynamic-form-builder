import { useFormSchema, useSetFormSchema } from "../../contexts/formSchemaContext";

const PreviewButton = ({ editMode, setEditMode }) => {
    const formSchema = useFormSchema();
    const setFormSchema = useSetFormSchema();

    const handleClick = (e) => {
        e.preventDefault();
        setEditMode(!editMode)
    }

    const clearForm = () => {
        setFormSchema([]);
        localStorage.setItem("submittedFormData", null);
    }

    return (
        <>
            {formSchema.length !== 0 &&
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={clearForm}
                        className="cursor-pointer h-fit rounded bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                        Clear Form
                    </button>
                    <button
                        onClick={handleClick}
                        className="cursor-pointer h-fit rounded bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        {editMode ? "Preview Form" : "Edit Form"}
                    </button>
                </div>
            }
        </>
    );
};

export default PreviewButton;