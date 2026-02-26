
import { useContext } from "react";
import { availableInputs } from "../utils/availableInputs";
import { FormSchemaContext } from "../contexts/formSchemaContext";

const JsonEditor = () => {

    const { setFormSchema } = useContext(FormSchemaContext);;

    const generateUniqueName = (type) => {
        const timestampPart = new Date().getTime();
        return `${type}${timestampPart}`;
    };

    const addInput = (key) => {
        setFormSchema(prev => [...prev, {
            type: key,
            label: "",
            placeholder: "",
            name: generateUniqueName(key),
            value: "",
            validationRules: [
                { type: 'required', value: false },
            ]
        }])
    }

    return (
        <div
            className="sticky top-6 h-fit w-[15%] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
            <div className="border-b border-slate-200 px-4 py-3">
                <div className="font-semibold text-slate-800">Input Library</div>
                <div className="mt-1 text-xs text-slate-500">Select a field type to add it</div>
            </div>
            {Object.entries(availableInputs).map(([key, value]) => {
                return <button
                    onClick={() => addInput(key)}
                    className="w-full cursor-pointer border-b border-slate-200 px-4 py-2.5 text-left text-sm font-medium capitalize text-slate-700 transition hover:bg-slate-50 last:border-b-0"
                    key={key}
                >
                    {value}
                </button>
            })}
        </div>
    );
};

export default JsonEditor;