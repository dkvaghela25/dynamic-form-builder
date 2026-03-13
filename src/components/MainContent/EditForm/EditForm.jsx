import { useState } from "react";
import { useFormSchema, useSetFormSchema } from "../../../contexts/formSchemaContext";
import InputCard from "./InputCard/InputCard";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

const EditForm = () => {

    const formSchema = useFormSchema();
    const setFormSchema = useSetFormSchema();
    const [displayId, setDisplayId] = useState(false);

    const handleToggle = (index) => {
        setDisplayId(prev => prev === index ? false : index)
    }

    const itemIds = formSchema.map((_, i) => i.toString());

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );


    const handleDragEnd = (e) => {
        const { active, over } = e;
        if (!over || active.id === over.id) return;

        setFormSchema((prev) => {
            const oldIndex = parseInt(active.id);
            const newIndex = parseInt(over.id);
            return arrayMove(prev, oldIndex, newIndex);
        });
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} >
            <SortableContext
                strategy={verticalListSortingStrategy}
                items={itemIds}
            >
                {formSchema.map((schema, index) => {
                    return (
                        <InputCard key={index.toString()} displayId={displayId} handleToggle={handleToggle} schema={schema} id={index.toString()} />
                    )
                })}
            </SortableContext>
        </DndContext>
    );
};

export default EditForm;