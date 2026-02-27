/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

export const FormSchemaContext = createContext();

export const FormSchemaProvider = ({ children }) => {
    const [formSchema, setFormSchema] = useState([]);

    const value = {
        formSchema,
        setFormSchema
    }

    return (
        <FormSchemaContext.Provider value={value}>{children}</FormSchemaContext.Provider>
    )

}

export const useFormSchemaContext = () => {
    const context = useContext(FormSchemaContext);
    return context;
}
