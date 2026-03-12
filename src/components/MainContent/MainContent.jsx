import { useState } from "react";
import FormContainer from "./FormContainer";
import PreviewButton from "../ui/PreviewButton";

const MainContent = () => {

    const [editMode, setEditMode] = useState(true);

    return (
        <>
            <div className="ml-auto flex w-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="border-b border-slate-200 pb-4 flex justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-800">Live Preview</h1>
                        <p className="mt-1 text-sm text-slate-500">Configure fields and see your form update instantly.</p>
                    </div>

                   <PreviewButton editMode={editMode} setEditMode={setEditMode} />
                </div>

                <FormContainer editMode={editMode} />

            </div>
        </>
    );
};

export default MainContent;