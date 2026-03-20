import { useEffect, useState } from "react";
import Icon from "../ui/Icon";
import { Link, useNavigate } from "react-router-dom";
import Table from "../ui/Table";
import Actions from "../ui/Actions";
import ConfirmationPopup from "../ui/ConfirmationPopup";
import { toastNotification } from "../../utils/toastHelper";
import EmptyMessage from "./EmptyMessage";
import PaginationBar from "../ui/PaginationBar";
import Select from "../ui/Select";
import FilterInputs from "./FilterInputs";

const FormSubmissionsTable = () => {

    const [selectedId, setSelectedId] = useState(null);

    const rawFormSchema = localStorage.getItem("formSchema")
    const rawFormData = localStorage.getItem("submittedFormData")
    const formSchema = JSON.parse(rawFormSchema) || [];
    const navigate = useNavigate();

    const [formData, setFormData] = useState(JSON.parse(rawFormData) || []);

    useEffect(() => {
        localStorage.setItem("submittedFormData", JSON.stringify(formData));
    }, [formData]);

    const tableColumns = [...formSchema.map(({ label }) => label), "Actions"];
    const tableData = formData.map(({ data, submissionId }) => {
        return {
            ...data,
            actions: <Actions
                handleEdit={() => handleEdit(submissionId)}
                handleDelete={() => setSelectedId(submissionId)}
            />
        }
    })

    const [tableRows, setTableRows] = useState(tableData);

    const handleEdit = (submissionId) => {
        navigate(`/form?submissionId=${submissionId}`)
    }

    const handleDelete = (submissionId) => {
        const newFormData = formData.filter(({ submissionId: currId }) => currId !== submissionId);
        setFormData(newFormData);
        setSelectedId(null)
        toastNotification("Row deleted successfully", "success");
    }

    return (
        <>
            {formData && tableData.length !== 0
                ? <>
                    <FilterInputs formSchema={formSchema} setTableRows={setTableRows} tableData={tableData} />
                    <Table columns={tableColumns} rows={tableRows} />
                    {tableRows.length !== 0 && <PaginationBar setTableRows={setTableRows} tableData={tableRows} />}
                </>
                : <EmptyMessage />}
            {selectedId && <ConfirmationPopup setSelectedId={setSelectedId} onConfirm={() => handleDelete(selectedId)} />}
        </>
    );
};

export default FormSubmissionsTable;
