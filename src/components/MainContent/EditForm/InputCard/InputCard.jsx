import { lazy, useState } from "react";
import InputPreview from "./InputField/InputField";
import { CurrentSchemaContext } from "../../../../contexts/CurrentSchemaContext";
import { useFormContext } from "react-hook-form";
import { useSetFormSchema } from "../../../../contexts/formSchemaContext";
import { GoChevronDown } from "react-icons/go";
import Icon from "../../../ui/Icon";
import { RxDragHandleDots2 } from "react-icons/rx";

const EditSchemaForm = lazy(() => import("./EditSchemaForm/EditSchemaForm"))

const InputCard = ({ displayId, handleToggle, schema, index }) => {

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
            <div key={index} className="rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm">

                <div onClick={() => handleToggle(index)} className={`cursor-pointer flex justify-between items-center gap-2 ${displayId === index ? "mb-2 border-b pb-3" : ""} border-b-slate-300`}>

                    <div className="flex items-center gap-2 font-medium text-[18px] text-slate-700 h-fit">
                        {displayId !== index && <RxDragHandleDots2 className="-ml-2 hover:cursor-grab" />}
                        <span>Label : {label}</span>
                    </div>
                    {displayId !== index
                        ? <GoChevronDown className="w-7 h-7" />
                        : <div className="flex gap-2">
                            <Icon icon="edit" helperText="Edit Schema" onClick={editSchema} />
                            <Icon icon="delete" helperText="Remove Schema" onClick={removeSchema} />
                        </div>
                    }
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

