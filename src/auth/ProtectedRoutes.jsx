import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toastNotification } from "../utils/toastHelper";
import { defaultLabels } from "../constants";

const ProtectedRoutes = () => {

    const { pathname } = useLocation();

    const formSchema = JSON.parse(localStorage.getItem("formSchema"));
    const isMissingSchema = !formSchema || formSchema.length === 0;
    const submittedFormData = JSON.parse(localStorage.getItem("submittedFormData"));

    const defaultLabelInFormSchema = formSchema?.find(schema =>
        defaultLabels.includes(schema.label)
    )?.label;

    useEffect(() => {
        if (pathname === "/final-form") {
            if (isMissingSchema) {
                toastNotification("Please create form schema before accessing final form page", "error");
            } else if (defaultLabelInFormSchema) {
                toastNotification(`${defaultLabelInFormSchema} is not allowed label please change that`, "error");
            }
        } else if (pathname === "/confirmation-page") {
            if (!submittedFormData) {
                toastNotification("Please fill the form before viewing confirmation page", "error");
            }
        }
    }, [isMissingSchema, defaultLabelInFormSchema, pathname, submittedFormData]);

    if (pathname === "/final-form" && (isMissingSchema || defaultLabelInFormSchema)) {
        return <Navigate to="/" replace />;
    } else if (pathname === "/confirmation-page" && (!submittedFormData)) {
        return <Navigate to="/final-form" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;