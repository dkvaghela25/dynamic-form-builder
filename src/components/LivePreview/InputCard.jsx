/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import EditForm from "./EditForm/EditForm";
import Preview from "./Preview/Preview";

const CurrentSchemaContext = createContext();

export const useCurrentSchemaContext = () => {
    const context = useContext(CurrentSchemaContext);
    return context
}

const InputCard = ({ schema, index }) => {

    const [editMode, setEditMode] = useState(false);

    return (
        <CurrentSchemaContext.Provider value={{schema, index, editMode, setEditMode}}>
            <div key={index} className="rounded-xl border border-slate-200 bg-slate-100 p-5 shadow-sm">
                {editMode
                    ? <EditForm />
                    : <Preview />
                }
            </div>
        </CurrentSchemaContext.Provider>
    );
};

export default InputCard;

