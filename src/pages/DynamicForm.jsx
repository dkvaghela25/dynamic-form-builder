import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import AvailableInputs from "../components/AvailableInputs/AvailableInputs";
import JsonViewer from "../components/JsonViewer/JsonViewer";
import MainContent from "../components/MainContent/MainContent";
import { useSetFormSchema } from "../contexts/formSchemaContext";
import { generateUniqueId } from "../utils/generateUniqueId";
import { availableInputs } from "../constants";
import { useState } from "react";

const DynamicForm = () => {

    const [activeId, setActiveId] = useState(null);
    const setFormSchema = useSetFormSchema();

    const addInput = (e) => {
        const inputType = e.active.data.current;
        const newSchema = availableInputs[inputType];
        if (e.over?.id !== "droppable-container" || !newSchema) return;

        const uniqueId = generateUniqueId(newSchema.type);
        setFormSchema(prev => [...prev, { ...newSchema, name: uniqueId, id: uniqueId }])
        const top = document.documentElement.scrollHeight;
        window.scrollTo({
            top,
            behavior: 'smooth'
        });

        setActiveId(null);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    return (
        <DndContext
            sensors={sensors}
            onDragStart={(e) => setActiveId(e.active.id)}
            onDragEnd={addInput}
        >
            <div className="flex w-full gap-10">
                <AvailableInputs />
                <MainContent />
                <JsonViewer />
            </div>

            <DragOverlay dropAnimation={null}>
                {activeId ? (
                    <div className="w-full cursor-move px-4 py-2.5 text-left text-sm font-medium bg-slate-100 capitalize text-slate-700 transition border border-slate-300 rounded-sm">
                        {activeId}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default DynamicForm;