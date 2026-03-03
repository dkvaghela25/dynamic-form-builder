import { createContext, useContext } from "react";

export const CurrentSchemaContext = createContext();

export const useCurrentSchemaContext = () => {
    const context = useContext(CurrentSchemaContext);
    return context
}
