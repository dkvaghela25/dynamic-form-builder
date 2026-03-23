import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import AvailableInputs from "../components/AvailableInputs/AvailableInputs";
import JsonViewer from "../components/JsonViewer/JsonViewer";
import MainContent from "../components/MainContent/MainContent";
import { useSetFormSchema } from "../contexts/formSchemaContext";
import { generateUniqueId } from "../utils/generateUniqueId";
import { availableInputs } from "../constants";

const DynamicForm = () => {

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
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    return (
        <DndContext sensors={sensors} onDragEnd={addInput}>
            <div className="flex w-full gap-10">
                <AvailableInputs />
                <MainContent />
                <JsonViewer />
            </div>
        </DndContext>
    );
};

export default DynamicForm;