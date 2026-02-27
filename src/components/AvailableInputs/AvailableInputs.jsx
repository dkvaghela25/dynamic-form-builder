
import { useContext } from "react";
import { FormSchemaContext } from "../../contexts/formSchemaContext";
import { availableInputs } from "../../utils/constants";

const AvailableInputs = () => {

    const { setFormSchema } = useContext(FormSchemaContext);;

    const generateUniqueName = (type) => {
        const timestampPart = new Date().getTime();
        return `${type}${timestampPart}`;
    };

    const addInput = (newSchema) => {
        setFormSchema(prev => [...prev, {...newSchema, name : generateUniqueName(newSchema.type)}])
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
                    onClick={() => addInput(value)}
                    className="w-full cursor-pointer border-b border-slate-200 px-4 py-2.5 text-left text-sm font-medium capitalize text-slate-700 transition hover:bg-slate-50 last:border-b-0"
                    key={key}
                >
                    {value.label}
                </button>
            })}
        </div>
    );
};

export default AvailableInputs;