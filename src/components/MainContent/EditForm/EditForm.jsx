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

    const itemIds = formSchema.map(schema => schema.id);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const findIndex = (schemaId) => {
        return formSchema.findIndex(schema => schema.id === schemaId)
    }

    const handleDragEnd = (e) => {
        const { active, over } = e;
        if (!over || active.id === over.id) return;

        const oldIndex = findIndex(active.id);
        const newIndex = findIndex(over.id);

        setFormSchema((prev) => arrayMove(prev, oldIndex, newIndex));
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} >
            <SortableContext
                strategy={verticalListSortingStrategy}
                items={itemIds}
            >
                {formSchema.map((schema, index) => {
                    return (
                        <InputCard
                            key={schema.id}
                            displayId={displayId}
                            handleToggle={handleToggle}
                            schema={schema}
                            index={index}
                            id={schema.id}
                        />
                    )
                })}
            </SortableContext>
        </DndContext>
    );
};

export default EditForm;