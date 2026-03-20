import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toastNotification } from "../utils/toastHelper";
import { defaultLabels } from "../constants";

const ProtectedRoutes = () => {

    const formSchema = JSON.parse(localStorage.getItem("formSchema"));
    const isMissingSchema = !formSchema || formSchema.length === 0;

    const defaultLabelInFormSchema = formSchema?.find(schema =>
        defaultLabels.includes(schema.label)
    )?.label;

    useEffect(() => {
        if (isMissingSchema) {
            toastNotification("Please create form schema before accessing this page", "error");
        } else if (defaultLabelInFormSchema) {
            toastNotification(`${defaultLabelInFormSchema} is not allowed label please change that`, "error");
        }
    }, [isMissingSchema, defaultLabelInFormSchema]);

    if (isMissingSchema || defaultLabelInFormSchema) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;