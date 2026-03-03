import { useState } from "react";
import { useFormSchema } from "../../contexts/formSchemaContext";
import PreviewForm from "./PreviewForm/PreviewForm";
import FinalForm from "./FinalForm/FinalForm";

const FormContainer = () => {

    const formSchema = useFormSchema();

    const [editMode, setEditMode] = useState(true);

    const handleClick = (e) => {
        e.preventDefault();
        setEditMode(!editMode)
    }

    return (
        <form className="ml-auto flex w-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="border-b border-slate-200 pb-4">
                <h1 className="text-2xl font-semibold text-slate-800">Live Preview</h1>
                <p className="mt-1 text-sm text-slate-500">Configure fields and see your form update instantly.</p>
            </div>
            {formSchema.length === 0
                ? <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-2xl font-semibold text-slate-600">Select an input type from the left panel</div>
                : <>
                    {editMode
                        ? <PreviewForm />
                        : <FinalForm />
                    }


                    <hr className="border-slate-200" />

                    <button
                        onClick={handleClick}
                        className="cursor-pointer rounded bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        {editMode ? "Final Form" : "Edit Form"}
                    </button>
                </>
            }
        </form>
    );
};

export default FormContainer;