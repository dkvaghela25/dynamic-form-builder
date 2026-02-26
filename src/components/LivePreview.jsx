import { useContext } from "react";
import { FormSchemaContext } from "../contexts/formSchemaContext";
import InputField from "./InputField";

const LivePreview = () => {
    const { formSchema } = useContext(FormSchemaContext);
    return (
        <form className="ml-auto flex w-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="border-b border-slate-200 pb-4">
                <h1 className="text-2xl font-semibold text-slate-800">Live Preview</h1>
                <p className="mt-1 text-sm text-slate-500">Configure fields and see your form update instantly.</p>
            </div>
            {formSchema.length === 0
                ? <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-2xl font-semibold text-slate-600">Select an input type from the left panel</div>
                : formSchema.map((schema, index) => {
                    return <InputField key={index} schema={schema} index={index} />
                })}
        </form>
    );
};

export default LivePreview;