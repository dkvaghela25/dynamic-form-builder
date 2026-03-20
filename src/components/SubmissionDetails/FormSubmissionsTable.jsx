import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../ui/Table";
import Actions from "../ui/Actions";
import ConfirmationPopup from "../ui/ConfirmationPopup";
import { toastNotification } from "../../utils/toastHelper";
import EmptyMessage from "./EmptyMessage";
import PaginationBar from "../ui/PaginationBar";
import FilterInputs from "./FilterInputs";
import { getSortingLogic } from "../../utils/getSortingLogic";

const FormSubmissionsTable = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(null);

    const rawFormSchema = localStorage.getItem("formSchema");
    const rawFormData = localStorage.getItem("submittedFormData");
    const formSchema = JSON.parse(rawFormSchema) || [];

    const [formData, setFormData] = useState(JSON.parse(rawFormData) || []);
    console.log(rawFormData)
    const [filteredRows, setFilteredRows] = useState([]);
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        localStorage.setItem("submittedFormData", JSON.stringify(formData));
    }, [formData]);

    const handleEdit = useCallback((submissionId) => {
        navigate(`/form?submissionId=${submissionId}`);
    }, [navigate]);

    const handleDelete = useCallback((submissionId) => {
        setFormData(prev => prev.filter(({ submissionId: currId }) => currId !== submissionId));
        setSelectedId(null);
        toastNotification("Row deleted successfully", "success");
    }, [])

    const tableData = useMemo(() => {
        return formData.map(({ data, submissionId }) => ({
            ...data,
            actions: (
                <Actions
                    handleEdit={() => handleEdit(submissionId)}
                    handleDelete={() => setSelectedId(submissionId)}
                />
            )
        }));
    }, [formData, handleEdit]);

    useEffect(() => {
        setFilteredRows(tableData);
    }, [tableData]);


    const tableColumns = [
        ...formSchema.map(({ name, label, type }) => ({
            name,
            label,
            sortBy: getSortingLogic(type, setTableRows)
        })),
        { name: "actions", label: "Actions" }
    ];

    return (
        <>
            {formData.length !== 0 ? (
                <>
                    <FilterInputs
                        formSchema={formSchema}
                        setFilteredRows={setFilteredRows}
                        tableData={tableData}
                    />
                    <Table columns={tableColumns} rows={tableRows} />
                    {filteredRows.length !== 0 && (
                        <PaginationBar
                            setTableRows={setTableRows}
                            filteredRows={filteredRows}
                        />
                    )}
                </>
            ) : (
                <EmptyMessage />
            )}
            {selectedId && (
                <ConfirmationPopup
                    setSelectedId={setSelectedId}
                    onConfirm={() => handleDelete(selectedId)}
                />
            )}
        </>
    );
};

export default FormSubmissionsTable;
