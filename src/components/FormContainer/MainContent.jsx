import { useState } from "react";
import FormContainer from "./FormContainer";

const MainContent = () => {

    const [editMode, setEditMode] = useState(true);

    const handleClick = (e) => {
        e.preventDefault();
        setEditMode(!editMode)
    }

    return (
        <>
            <div className="ml-auto flex w-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="border-b border-slate-200 pb-4">
                    <h1 className="text-2xl font-semibold text-slate-800">Live Preview</h1>
                    <p className="mt-1 text-sm text-slate-500">Configure fields and see your form update instantly.</p>
                </div>

                <FormContainer editMode={editMode} />

                <hr className="border-slate-200" />

                <button
                    onClick={handleClick}
                    className="cursor-pointer rounded bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                    {editMode ? "Final Form" : "Edit Form"}
                </button>
            </div>
        </>
    );
};

export default MainContent;