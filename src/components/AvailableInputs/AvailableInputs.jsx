import { availableInputs } from "../../constants";
import DraggableButton from "./DraggableButton";

const AvailableInputs = () => {
    return (
        <div
            className="sticky top-6 h-fit w-[15%] shrink-0 rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
            <div className="border-b border-slate-200 px-4 py-3">
                <div className="font-semibold text-slate-800">Input Library</div>
                <div className="mt-1 text-xs text-slate-500">Select a field type to add it</div>
            </div>
            {Object.keys(availableInputs).map((inputType) => {
                return <DraggableButton key={inputType} inputType={inputType} />
            })}
        </div>
    );
};

export default AvailableInputs;