import { lazy, useState } from "react";
import InputPreview from "./InputField/InputField";
import { CurrentSchemaContext } from "../../../../contexts/CurrentSchemaContext";
import { useFormContext } from "react-hook-form";
import { useSetFormSchema } from "../../../../contexts/formSchemaContext";
import { GoChevronDown } from "react-icons/go";
import Icon from "../../../ui/Icon";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const EditSchemaForm = lazy(() => import("./EditSchemaForm/EditSchemaForm"))

const InputCard = ({ displayId, handleToggle, schema, id }) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const index = Number(id);

    const [editMode, setEditMode] = useState(false);
    const { unregister } = useFormContext();

    const value = {
        schema,
        index,
        editMode,
        setEditMode,
    }

    const { label, name } = schema;

    const setFormSchema = useSetFormSchema();

    const removeSchema = (e) => {
        e.stopPropagation();
        e.preventDefault();
        unregister(name)
        setFormSchema(prev => prev.filter((currElem, currIndex) => currIndex !== index));
        handleToggle(false);
    }

    const editSchema = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setEditMode(prev => !prev);
    }

    return (
        <CurrentSchemaContext.Provider value={value}>
            <div
                ref={setNodeRef}
                style={{
                    transform: CSS.Transform.toString(transform),
                    transition
                }}
                className="rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm"
            >
                <div className="flex gap-2 w-full">
                    {displayId !== index &&
                        <button
                            {...attributes}
                            {...listeners}
                            type="button"
                        >
                            <RxDragHandleDots2 className="-ml-2 hover:cursor-grab" />
                        </button>
                    }

                    <div onClick={() => handleToggle(index)} className={`w-full cursor-pointer flex justify-between items-center ${displayId === index ? "mb-2 border-b pb-3" : ""} border-b-slate-300`}>
                        <div className="font-medium text-[18px] text-slate-700 h-fit">
                            Label : {label}
                        </div>
                        {displayId !== index
                            ? <GoChevronDown className="w-7 h-7" />
                            : <div className="flex gap-2">
                                <Icon icon="edit" helperText="Edit Schema" onClick={editSchema} />
                                <Icon icon="delete" helperText="Remove Schema" onClick={removeSchema} />
                            </div>
                        }
                    </div>
                </div>

                {displayId === index &&
                    <>
                        {editMode ? <EditSchemaForm /> : <InputPreview />}
                    </>
                }
            </div>
        </CurrentSchemaContext.Provider>
    );
};

export default InputCard;

