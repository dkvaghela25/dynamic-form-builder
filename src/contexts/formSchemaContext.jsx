/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const FormSchemaContext = createContext();

export const FormSchemaProvider = ({ children }) => {
    const [formSchema, setFormSchema] = useState([]);

    const value = useMemo(() => ({ formSchema, setFormSchema }), [formSchema])

    return (
        <FormSchemaContext.Provider value={value}>
            {children}
        </FormSchemaContext.Provider>
    );
};

export const useFormSchemaContext = () => {
    const context = useContext(FormSchemaContext);
    if (context === undefined) throw new Error("useFormSchema must be used within Provider");
    return context;
};
