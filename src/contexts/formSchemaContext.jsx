/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const FormStateContext = createContext();
const FormDispatchContext = createContext();

export const FormSchemaProvider = ({ children }) => {
    const [formSchema, setFormSchema] = useState([]);

    return (
        <FormDispatchContext.Provider value={setFormSchema}>
            <FormStateContext.Provider value={formSchema}>
                {children}
            </FormStateContext.Provider>
        </FormDispatchContext.Provider>
    );
};

export const useFormSchema = () => {
    const context = useContext(FormStateContext);
    if (context === undefined) throw new Error("useFormSchema must be used within Provider");
    return context;
};

export const useSetFormSchema = () => {
    const context = useContext(FormDispatchContext);
    if (context === undefined) throw new Error("useSetFormSchema must be used within Provider");
    return context;
};
