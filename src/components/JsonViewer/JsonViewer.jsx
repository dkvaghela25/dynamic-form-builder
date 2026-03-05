// import { useFormSchema } from "../../contexts/formSchemaContext";

import PrettierJSON from "./PrettierJSON";

const JsonViewer = () => {
    return (
        <div className="sticky top-6 w-[22%] h-fit min-h-[88vh] shrink-0 rounded-2xl border border-slate-200 bg-white shadow-sm ">
            <div className="border-b border-slate-200 px-4 py-3">
                <div className="font-semibold text-slate-800">JSON Viewer</div>
                <div className="mt-1 text-xs text-slate-500">Configure fields and see your JSON update instantly.</div>
            </div>
            <PrettierJSON />
        </div>
    );
};

export default JsonViewer;

