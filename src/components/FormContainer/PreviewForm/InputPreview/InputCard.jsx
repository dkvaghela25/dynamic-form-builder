import { lazy, useState } from "react";
import InputPreview from "./InputPreview";
import { CurrentSchemaContext } from "../../../../contexts/CurrentSchemaContext";

const EditSchemaForm = lazy(() => import("../EditForm/EditSchemaForm"))

const InputCard = ({ schema, index }) => {

    const [editMode, setEditMode] = useState(false);

    const value = {
        schema,
        index,
        editMode,
        setEditMode
    }

    return (
        <CurrentSchemaContext.Provider value={value}>
            <div key={index} className="rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm">
                {editMode
                    ? <EditSchemaForm />
                    : <InputPreview />
                }
            </div>
        </CurrentSchemaContext.Provider>
    );
};

export default InputCard;

