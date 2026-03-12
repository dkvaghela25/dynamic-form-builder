import { useFormSchema } from "../../contexts/formSchemaContext";

const PreviewButton = ({editMode, setEditMode}) => {
    const formSchema = useFormSchema();
    
    const handleClick = (e) => {
        e.preventDefault();
        setEditMode(!editMode)
    }

    return (
        <>
            {formSchema.length !== 0 && <button
                onClick={handleClick}
                className="cursor-pointer h-fit rounded bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
                {editMode ? "Preview Form" : "Edit Form"}
            </button>}
        </>
    );
};

export default PreviewButton;