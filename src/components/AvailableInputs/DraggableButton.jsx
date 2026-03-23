import { useDraggable } from "@dnd-kit/core";
import { memo } from "react";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { useSetFormSchema } from "../../contexts/formSchemaContext";
import { availableInputs } from "../../constants";

const DraggableButton = memo(({ inputType }) => {

    const setFormSchema = useSetFormSchema();
    const schema = availableInputs[inputType];

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: inputType,
        data: inputType
    });

    const addInput = (e) => {
        e.preventDefault();
        const uniqueId = generateUniqueId(inputType);
        setFormSchema(prev => [...prev, { ...schema, name: uniqueId, id: uniqueId }])
        const top = document.documentElement.scrollHeight;
        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                onClick={(e) => {
                    if (!isDragging) addInput(e, schema);
                }}
                className={`
                    w-full cursor-move px-4 py-2.5 text-left text-sm font-medium  capitalize text-slate-700 transition hover:bg-slate-50 last:border-b-0
                    ${isDragging ? "border border-slate-300 rounded-sm opacity-50" : "border-b border-slate-200 opacity-100"}
                `}
            >
                {schema.label}
            </div>
        </>
    );
});

export default DraggableButton;