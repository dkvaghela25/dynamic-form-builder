import { useFormSchemaContext } from "../contexts/formSchemaContext";

const JsonViewer = () => {

    const { formSchema } = useFormSchemaContext();

    return (
        <div className="sticky top-6 w-[20%] h-fit min-h-[88vh] shrink-0 rounded-2xl border border-slate-200 bg-white shadow-sm ">
            <div className="border-b border-slate-200 px-4 py-3">
                <div className="font-semibold text-slate-800">JSON Viewer</div>
                <div className="mt-1 text-xs text-slate-500">Configure fields and see your JSON update instantly.</div>
            </div>
            {/* <div ">
                {JSON.stringify(formSchema)}
            </div> */}

            <pre className="p-3 pr-0 box-border w-full max-h-[80vh] break-all overflow-x-auto overflow-y-auto">
                {JSON.stringify(formSchema, null, 1)}
            </pre>
        </div>
    );
};

export default JsonViewer;

